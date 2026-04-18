export const SCALE_ROOTS: Record<string, number> = {
  'C': 60,
  'C#': 61,
  'D': 62,
  'D#': 63,
  'E': 64,
  'F': 65,
  'F#': 66,
  'G': 67,
  'G#': 68,
  'A': 69,
  'A#': 70,
  'B': 71,
};

const INDIAN_NOTE_OFFSETS: Record<string, number> = {
  'Sa': 0,
  're': 1,
  'Re': 2,
  'ga': 3,
  'Ga': 4,
  'ma': 5,
  'Ma#': 6,
  'Pa': 7,
  'dha': 8,
  'Dha': 9,
  'ni': 10,
  'Ni': 11,
};

export class ScaleMapper {
  static getMidiNote(indianNote: string, rootScale: string): number {
    const rootMidi = SCALE_ROOTS[rootScale] || 60;
    
    let octaveOffset = 0;
    let cleanNote = indianNote;

    if (indianNote.startsWith('_')) {
      octaveOffset = -12;
      cleanNote = indianNote.substring(1);
    } else if (indianNote.endsWith('^')) {
      octaveOffset = 12;
      cleanNote = indianNote.slice(0, -1);
    }

    const noteOffset = INDIAN_NOTE_OFFSETS[cleanNote];
    if (noteOffset === undefined) {
      console.warn(`Unknown note: ${indianNote}`);
      return rootMidi + octaveOffset;
    }

    return rootMidi + octaveOffset + noteOffset;
  }
}
