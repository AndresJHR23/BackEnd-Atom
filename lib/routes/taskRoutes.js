"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = require("../controllers/TaskController");
const router = (0, express_1.Router)();
const taskController = new TaskController_1.TaskController();
// GET /api/tasks/user/:userId - Obtener tareas por usuario
router.get('/user/:userId', taskController.getTasksByUser);
// POST /api/tasks - Crear nueva tarea
router.post('/', taskController.create);
// PUT /api/tasks/:id - Actualizar tarea
router.put('/:id', taskController.update);
// DELETE /api/tasks/:id - Eliminar tarea
router.delete('/:id', taskController.delete);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map