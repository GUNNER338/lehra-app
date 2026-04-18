import { Router } from 'express';
import { getRaag } from '../controllers/raagController';

const router = Router();

router.get('/:name', getRaag);

export default router;
