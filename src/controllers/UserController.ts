import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { userValidationSchema } from '../utils/validators';
import { ApiResponse } from '../models';
import { asyncHandler, AppError } from '../utils/errorHandler';

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  findByEmail = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params;
    
    if (!email) {
      throw new AppError('Email es requerido', 400);
    }

    const user = await this.userRepository.findByEmail(email);
    
    res.json({
      success: true,
      data: user
    } as ApiResponse);
  });

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { error, value } = userValidationSchema.create.validate(req.body);
    
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(value.email);
    if (existingUser) {
      throw new AppError('El usuario ya existe', 409);
    }

    const user = await this.userRepository.create(value);
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'Usuario creado exitosamente'
    } as ApiResponse);
  });
}