import { RaagData } from '../types';

export const raags: Record<string, RaagData> = {
  yaman: {
    raag: 'Yaman',
    instrument: 'Harmonium',
    scale: 'C',
    notes: [
      { note: 'Sa', duration: 1 },
      { note: 'Re', duration: 1 },
      { note: 'Ga', duration: 2 },
      { note: 'Ma#', duration: 1 },
      { note: 'Pa', duration: 2 },
    ],
  },
};
