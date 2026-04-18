import { RaagPattern, raags } from './raagPatterns';
import { ScaleMapper } from './scaleMapper';

export interface MidiNoteEvent {
  midi: number;
  duration: number;
}

export class MidiPlayer {
  private webViewRef: any;

  constructor(webViewRef: any) {
    this.webViewRef = webViewRef;
  }

  playLehra(raagKey: string, scale: string, bpm: number) {
    const raag = raags[raagKey.toLowerCase()];
    if (!raag) {
      console.error(`Raag ${raagKey} not found`);
      return;
    }

    this.playPattern(raag.name, scale, bpm, raag.notes);
  }

  playPattern(raagName: string, scale: string, bpm: number, notes: any[]) {
    const pattern: MidiNoteEvent[] = notes.map(note => ({
      midi: ScaleMapper.getMidiNote(note.note, scale),
      duration: note.duration
    }));

    this.sendMessage({
      type: 'PLAY',
      pattern,
      bpm
    });
  }

  stop() {
    this.sendMessage({ type: 'STOP' });
  }

  updateBpm(bpm: number) {
    this.sendMessage({ type: 'UPDATE_BPM', bpm });
  }

  private sendMessage(message: any) {
    const json = JSON.stringify(message);
    
    if (this.webViewRef) {
      if (this.webViewRef.contentWindow) {
        // Web Iframe support
        this.webViewRef.contentWindow.postMessage(json, '*');
      } else if (this.webViewRef.postMessage) {
        // Mobile WebView support
        this.webViewRef.postMessage(json);
      }
    }
  }
}
