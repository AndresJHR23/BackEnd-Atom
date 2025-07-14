"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskValidationSchema = exports.userValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidationSchema = {
    create: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            'string.email': 'Debe ser un email válido',
            'any.required': 'El email es requerido'
        })
    })
};
exports.taskValidationSchema = {
    create: joi_1.default.object({
        title: joi_1.default.string().min(1).max(100).required().messages({
            'string.min': 'El título debe tener al menos 1 carácter',
            'string.max': 'El título no puede exceder 100 caracteres',
            'any.required': 'El título es requerido'
        }),
        description: joi_1.default.string().min(1).max(500).required().messages({
            'string.min': 'La descripción debe tener al menos 1 carácter',
            'string.max': 'La descripción no puede exceder 500 caracteres',
            'any.required': 'La descripción es requerida'
        }),
        userId: joi_1.default.string().required().messages({
            'any.required': 'El ID del usuario es requerido'
        })
    }),
    update: joi_1.default.object({
        title: joi_1.default.string().min(1).max(100).optional().messages({
            'string.min': 'El título debe tener al menos 1 carácter',
            'string.max': 'El título no puede exceder 100 caracteres'
        }),
        description: joi_1.default.string().min(1).max(500).optional().messages({
            'string.min': 'La descripción debe tener al menos 1 carácter',
            'string.max': 'La descripción no puede exceder 500 caracteres'
        }),
        completed: joi_1.default.boolean().optional()
    }).min(1).messages({
        'object.min': 'Debe proporcionar al menos un campo para actualizar'
    })
};
//# sourceMappingURL=validators.js.map