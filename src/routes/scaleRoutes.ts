import { Router } from 'express';
import { mapScale } from '../controllers/scaleController';

const router = Router();

router.get('/', mapScale);

export default router;
