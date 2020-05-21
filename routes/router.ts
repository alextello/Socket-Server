import { Router } from 'express';
import { getMensajes } from '../controllers/controller';

const router = Router();

router.get('/mensajes', getMensajes);

router.post('/mensajes/:id', getMensajes);

export default router;
