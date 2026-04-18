import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { getToneEngineHtml } from '../webview/toneEngine';
import { MidiPlayer } from '../midi/midiPlayer';

interface LehraEngineProps {
  onLoad?: () => void;
}

export interface LehraEngineHandle {
  play: (raag: string, scale: string, bpm: number) => void;
  playPattern: (raag: string, scale: string, bpm: number, notes: any[]) => void;
  stop: () => void;
  setBpm: (bpm: number) => void;
}

const LehraEngine = forwardRef<LehraEngineHandle, LehraEngineProps>(({ onLoad }, ref) => {
  const webViewRef = useRef<any>(null);
  const player = useRef<MidiPlayer | null>(null);

  const handleMessage = (messageData: string) => {
    try {
      const data = JSON.parse(messageData);
      if (data.type === 'LOADED') {
        onLoad?.();
      } else if (data.type === 'DEBUG') {
        console.log('MIDI Engine Debug:', data.message);
      }
    } catch (e) {
      // Ignore non-json messages
    }
  };

  useEffect(() => {
    // On web, we communicate with the iframe's contentWindow
    const target = Platform.OS === 'web' ? webViewRef.current : webViewRef.current;
    if (target) {
      player.current = new MidiPlayer(target);
    }

    if (Platform.OS === 'web') {
      const listener = (event: MessageEvent) => {
        handleMessage(event.data);
      };
      window.addEventListener('message', listener);
      
      // For web, we need to INIT manually after iframe loads
      if (webViewRef.current) {
        webViewRef.current.onload = () => {
          webViewRef.current.contentWindow?.postMessage(JSON.stringify({ type: 'INIT' }), '*');
        };
      }

      return () => window.removeEventListener('message', listener);
    }
  }, [webViewRef.current]);

  useImperativeHandle(ref, () => ({
    play: (raag, scale, bpm) => {
      player.current?.playLehra(raag, scale, bpm);
    },
    playPattern: (raag, scale, bpm, notes) => {
      player.current?.playPattern(raag, scale, bpm, notes);
    },
    stop: () => {
      player.current?.stop();
    },
    setBpm: (bpm) => {
      player.current?.updateBpm(bpm);
    }
  }));

  const onMessage = (event: any) => {
    handleMessage(event.nativeEvent.data);
  };

  if (Platform.OS === 'web') {
    return (
      <iframe
        ref={webViewRef}
        style={{ display: 'none' }}
        srcDoc={getToneEngineHtml()}
        title="ToneEngine"
      />
    );
  }

  return (
    <WebView
      ref={webViewRef}
      source={{ html: getToneEngineHtml() }}
      onMessage={onMessage}
      style={{ height: 0, width: 0, opacity: 0, position: 'absolute' }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      originWhitelist={['*']}
      onLoadEnd={() => {
        webViewRef.current?.postMessage(JSON.stringify({ type: 'INIT' }));
      }}
    />
  );
});

export default LehraEngine;
