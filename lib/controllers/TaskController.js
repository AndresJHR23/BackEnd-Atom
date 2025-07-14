"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const TaskRepository_1 = require("../repositories/TaskRepository");
const validators_1 = require("../utils/validators");
const errorHandler_1 = require("../utils/errorHandler");
class TaskController {
    constructor() {
        this.getTasksByUser = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { userId } = req.params;
            if (!userId) {
                throw new errorHandler_1.AppError('ID de usuario es requerido', 400);
            }
            const tasks = await this.taskRepository.findByUserId(userId);
            res.json({
                success: true,
                data: tasks
            });
        });
        this.create = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { error, value } = validators_1.taskValidationSchema.create.validate(req.body);
            if (error) {
                throw new errorHandler_1.AppError(error.details[0].message, 400);
            }
            const task = await this.taskRepository.create(value);
            res.status(201).json({
                success: true,
                data: task,
                message: 'Tarea creada exitosamente'
            });
        });
        this.update = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { error, value } = validators_1.taskValidationSchema.update.validate(req.body);
            if (error) {
                throw new errorHandler_1.AppError(error.details[0].message, 400);
            }
            const task = await this.taskRepository.update(id, value);
            res.json({
                success: true,
                data: task,
                message: 'Tarea actualizada exitosamente'
            });
        });
        this.delete = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            await this.taskRepository.delete(id);
            res.json({
                success: true,
                message: 'Tarea eliminada exitosamente'
            });
        });
        this.taskRepository = new TaskRepository_1.TaskRepository();
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=TaskController.js.map