import { Request, Response } from 'express';
import { TempoService } from '../services/tempoService';

export const calculateTempo = (req: Request, res: Response) => {
  const { bpm, notes } = req.body;

  if (bpm === undefined || !notes || !Array.isArray(notes)) {
    return res.status(400).json({ error: 'BPM and notes array are required' });
  }

  try {
    const calculatedNotes = TempoService.calculateDurations(bpm, notes);
    res.json({ bpm, notes: calculatedNotes });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
