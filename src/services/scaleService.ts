import { ScaleMapping } from '../types';

export class ScaleService {
  private static readonly notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  private static readonly indianToInterval: Record<string, number> = {
    'Sa': 0,
    're': 1,
    'Re': 2,
    'ga': 3,
    'Ga': 4,
    'ma': 5,
    'Ma#': 6,
    'Ma': 5, // Default Ma
    'Pa': 7,
    'dha': 8,
    'Dha': 9,
    'ni': 10,
    'Ni': 11,
  };

  static getMapping(rootScale: string): ScaleMapping {
    const rootIndex = this.notes.indexOf(rootScale.toUpperCase());
    if (rootIndex === -1) {
      throw new Error('Invalid root scale');
    }

    const mapping: ScaleMapping = {};
    for (const [indianNote, interval] of Object.entries(this.indianToInterval)) {
      const noteIndex = (rootIndex + interval) % 12;
      const mappedNote = this.notes[noteIndex];
      if (mappedNote) {
        mapping[indianNote] = mappedNote;
      }
    }

    return mapping;
  }
}
