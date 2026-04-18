import { Request, Response } from 'express';
import { ScaleService } from '../services/scaleService';

export const mapScale = (req: Request, res: Response) => {
  const { scale } = req.query;

  if (!scale || typeof scale !== 'string') {
    return res.status(400).json({ error: 'Scale query parameter is required' });
  }

  try {
    const mapping = ScaleService.getMapping(scale);
    res.json({ scale, mapping });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
