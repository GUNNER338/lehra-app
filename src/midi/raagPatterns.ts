export interface NotePattern {
  note: string;
  duration: number; // in beats
}

export interface RaagPattern {
  name: string;
  notes: NotePattern[];
}

export const raags: Record<string, RaagPattern> = {
  yaman: {
    name: 'Yaman',
    notes: [
      { note: 'Sa', duration: 1 },
      { note: 'Re', duration: 1 },
      { note: 'Ga', duration: 2 },
      { note: 'Ma#', duration: 1 },
      { note: 'Pa', duration: 2 },
      { note: 'Dha', duration: 1 },
      { note: 'Ni', duration: 1 },
      { note: 'Sa^', duration: 2 }, // Sa^ for upper octave
    ],
  },
};
