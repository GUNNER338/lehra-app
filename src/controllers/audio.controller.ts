import { Request, Response, NextFunction } from 'express';
import { audioService } from '../services/audio.service';
import { APP_CONSTANTS, HTTP_STATUS } from '../constants/app.constants';
import fs from 'fs';
import path from 'path';

export class AudioController {
  /**
   * Handles the tempo adjustment request.
   */
  async adjustTempo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log('Incoming request query:', req.query);
      console.log('Incoming request body:', req.body);

      // Support both body (POST) and query (GET)
      const bpmValue = (req.body && req.body.bpm) || (req.query && req.query.bpm);
      const bpm = typeof bpmValue === 'string' ? parseInt(bpmValue) : bpmValue;

      // Validation
      if (!bpm || isNaN(bpm)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          error: 'BPM is required and must be a number',
        });
        return;
      }

      if (bpm < APP_CONSTANTS.MIN_BPM || bpm > APP_CONSTANTS.MAX_BPM) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          error: `BPM must be between ${APP_CONSTANTS.MIN_BPM} and ${APP_CONSTANTS.MAX_BPM}`,
        });
        return;
      }

      const filePath = await audioService.getProcessedAudio(bpm);

      // Stream the file back to client
      const stat = fs.statSync(filePath);
      const fileName = path.basename(filePath);

      res.writeHead(HTTP_STATUS.OK, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Accept-Ranges': 'bytes',
      });

      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
      
    } catch (error) {
      next(error);
    }
  }
}

export const audioController = new AudioController();
