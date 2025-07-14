import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// GET /api/users/:email - Buscar usuario por email
router.get('/:email', userController.findByEmail);

// POST /api/users - Crear nuevo usuario
router.post('/', userController.create);

export default router;