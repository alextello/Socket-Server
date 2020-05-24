import { Router } from 'express';
import { getMensajes, getMensajesPrivados, getUsuarios, getUsuariosDetalle } from '../controllers/controller';

const router = Router();

router.get('/mensajes', getMensajes);

router.post('/mensajes/:id', getMensajesPrivados);

// Servicio para obtener IDs de los usuarios
router.get('/usuarios', getUsuarios);

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', getUsuariosDetalle);

export default router;
