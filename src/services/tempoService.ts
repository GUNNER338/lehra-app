import { Note, NoteWithTime } from '../types';

export class TempoService {
  static calculateDurations(bpm: number, notes: Note[]): NoteWithTime[] {
    if (bpm <= 0) {
      throw new Error('BPM must be greater than 0');
    }

    const msPerBeat = 60000 / bpm;

    return notes.map(note => ({
      ...note,
      durationMs: msPerBeat * note.duration,
    }));
  }
}
