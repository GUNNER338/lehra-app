import { Router } from 'express';
import { audioController } from '../controllers/audio.controller';

const router = Router();

// Endpoint for tempo adjustment
// Supports both POST (form/json) and GET (query params)
router.post('/tempo', (req, res, next) => audioController.adjustTempo(req, res, next));
router.get('/tempo', (req, res, next) => audioController.adjustTempo(req, res, next));

export default router;
