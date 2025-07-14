import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController();

// GET /api/tasks/user/:userId - Obtener tareas por usuario
router.get('/user/:userId', taskController.getTasksByUser);

// POST /api/tasks - Crear nueva tarea
router.post('/', taskController.create);

// PUT /api/tasks/:id - Actualizar tarea
router.put('/:id', taskController.update);

// DELETE /api/tasks/:id - Eliminar tarea
router.delete('/:id', taskController.delete);

export default router;