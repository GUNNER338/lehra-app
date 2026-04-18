import { Router } from 'express';
import { calculateTempo } from '../controllers/tempoController';

const router = Router();

router.post('/calculate', calculateTempo);

export default router;
