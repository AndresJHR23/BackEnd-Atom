import Joi from 'joi';

export const userValidationSchema = {
  create: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Debe ser un email válido',
      'any.required': 'El email es requerido'
    })
  })
};

export const taskValidationSchema = {
  create: Joi.object({
    title: Joi.string().min(1).max(100).required().messages({
      'string.min': 'El título debe tener al menos 1 carácter',
      'string.max': 'El título no puede exceder 100 caracteres',
      'any.required': 'El título es requerido'
    }),
    description: Joi.string().min(1).max(500).required().messages({
      'string.min': 'La descripción debe tener al menos 1 carácter',
      'string.max': 'La descripción no puede exceder 500 caracteres',
      'any.required': 'La descripción es requerida'
    }),
    userId: Joi.string().required().messages({
      'any.required': 'El ID del usuario es requerido'
    })
  }),
  
  update: Joi.object({
    title: Joi.string().min(1).max(100).optional().messages({
      'string.min': 'El título debe tener al menos 1 carácter',
      'string.max': 'El título no puede exceder 100 caracteres'
    }),
    description: Joi.string().min(1).max(500).optional().messages({
      'string.min': 'La descripción debe tener al menos 1 carácter',
      'string.max': 'La descripción no puede exceder 500 caracteres'
    }),
    completed: Joi.boolean().optional()
  }).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar'
  })
};