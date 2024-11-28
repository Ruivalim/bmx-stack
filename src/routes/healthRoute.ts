import { Router } from 'express';
import { getHealthStatus, getLiveness, getReadiness } from '../controllers/healthController';

const router = Router();

router.get('/', getHealthStatus);
router.get('/liveness', getLiveness);
router.get('/readiness', getReadiness);

export default router;
