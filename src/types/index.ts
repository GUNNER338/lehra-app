export interface Note {
  note: string; // The Indian note name (Sa, Re, Ga...)
  duration: number; // Duration in beats/units
}

export interface RaagData {
  raag: string;
  instrument: string;
  scale: string;
  notes: Note[];
}

export interface ScaleMapping {
  [key: string]: string;
}

export interface TempoRequest {
  bpm: number;
  notes: Note[];
}

export interface NoteWithTime extends Note {
  durationMs: number;
}
