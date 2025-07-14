import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/TaskRepository';
import { taskValidationSchema } from '../utils/validators';
import { ApiResponse } from '../models';
import { asyncHandler, AppError } from '../utils/errorHandler';

export class TaskController {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  getTasksByUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    
    if (!userId) {
      throw new AppError('ID de usuario es requerido', 400);
    }

    const tasks = await this.taskRepository.findByUserId(userId);
    
    res.json({
      success: true,
      data: tasks
    } as ApiResponse);
  });

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { error, value } = taskValidationSchema.create.validate(req.body);
    
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const task = await this.taskRepository.create(value);
    
    res.status(201).json({
      success: true,
      data: task,
      message: 'Tarea creada exitosamente'
    } as ApiResponse);
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { error, value } = taskValidationSchema.update.validate(req.body);
    
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const task = await this.taskRepository.update(id, value);
    
    res.json({
      success: true,
      data: task,
      message: 'Tarea actualizada exitosamente'
    } as ApiResponse);
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    await this.taskRepository.delete(id);
    
    res.json({
      success: true,
      message: 'Tarea eliminada exitosamente'
    } as ApiResponse);
  });
}