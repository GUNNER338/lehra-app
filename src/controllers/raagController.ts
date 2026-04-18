import { Request, Response } from 'express';
import { RaagService } from '../services/raagService';

export const getRaag = (req: Request, res: Response) => {
  const { name } = req.params;

  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Valid Raag name is required' });
  }

  const raagData = RaagService.getRaagByName(name);

  if (!raagData) {
    return res.status(404).json({ error: 'Raag not found' });
  }

  res.json(raagData);
};
