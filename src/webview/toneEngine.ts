export const getToneEngineHtml = () => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>
    <style>
        body { background: transparent; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; overflow: hidden; }
        #status { font-size: 12px; opacity: 0.5; }
    </style>
</head>
<body>
    <div id="status">MIDI Engine Ready</div>
    <script>
        let harmonium;
        let isPlaying = false;
        let bpm = 60;
        let pattern = [];
        let currentSequence = null;

        // Cross-platform communication bridge
        const sendToNative = (data) => {
            const message = JSON.stringify(data);
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(message);
            } else {
                window.parent.postMessage(message, "*");
            }
        };

        // Redefine console log to use our bridge
        window.console.log = function(message) {
          sendToNative({ type: 'DEBUG', message: message });
        };

        function initSampler() {
            try {
                // Synthesized Harmonium (Double Reed)
                harmonium = new Tone.PolySynth(Tone.Synth, {
                    oscillator: {
                        type: "custom",
                        partials: [1, 0.5, 0.7, 0.4],
                    },
                    envelope: {
                        attack: 0.1,
                        decay: 0.2,
                        sustain: 1,
                        release: 1
                    }
                });

                const vibrato = new Tone.Vibrato(5, 0.1);
                const filter = new Tone.Filter(1500, "lowpass").toDestination();

                // Connect in a proper serial chain
                harmonium.connect(vibrato);
                vibrato.connect(filter);

                sendToNative({ type: 'LOADED' });
                console.log("Engine Initialized Successfully");
            } catch (e) {
                console.log("Error Init: " + e.message);
            }
        }

        function stopPlayback() {
            if (currentSequence) {
                currentSequence.stop();
                currentSequence.dispose();
                currentSequence = null;
            }
            Tone.Transport.stop();
            isPlaying = false;
        }

        function startPlayback() {
            try {
                if (isPlaying) stopPlayback();
                
                // CRITICAL: Must be called during the play message handling
                Tone.start();
                
                const secondsPerBeat = 60 / bpm;
                Tone.Transport.bpm.value = bpm;
                
                let currentBeats = 0;
                const events = pattern.map(note => {
                    const event = { 
                      time: currentBeats * secondsPerBeat, 
                      note: note.midi, 
                      duration: note.duration * secondsPerBeat 
                    };
                    currentBeats += note.duration;
                    return event;
                });

                const totalDurationSeconds = currentBeats * secondsPerBeat;

                currentSequence = new Tone.Part((time, event) => {
                    harmonium.triggerAttackRelease(
                        Tone.Frequency(event.note, "midi").toNote(),
                        event.duration,
                        time
                    );
                }, events);

                currentSequence.loop = true;
                currentSequence.loopEnd = totalDurationSeconds;
                currentSequence.start(0);
                
                Tone.Transport.start();
                isPlaying = true;
                console.log("Playback Started: BPM=" + bpm);
            } catch (e) {
                console.log("Error Play: " + e.message);
            }
        }

        window.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            
            switch(data.type) {
                case 'INIT':
                    initSampler();
                    break;
                case 'PLAY':
                    pattern = data.pattern;
                    bpm = data.bpm;
                    startPlayback();
                    break;
                case 'STOP':
                    stopPlayback();
                    break;
                case 'UPDATE_BPM':
                    bpm = data.bpm;
                    Tone.Transport.bpm.rampTo(bpm, 0.5);
                    break;
            }
        });

        document.getElementById('status').innerText = "Engine Initializing...";
    </script>
</body>
</html>
`;
