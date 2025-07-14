"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const validators_1 = require("../utils/validators");
const errorHandler_1 = require("../utils/errorHandler");
class UserController {
    constructor() {
        this.findByEmail = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { email } = req.params;
            if (!email) {
                throw new errorHandler_1.AppError('Email es requerido', 400);
            }
            const user = await this.userRepository.findByEmail(email);
            res.json({
                success: true,
                data: user
            });
        });
        this.create = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { error, value } = validators_1.userValidationSchema.create.validate(req.body);
            if (error) {
                throw new errorHandler_1.AppError(error.details[0].message, 400);
            }
            // Verificar si el usuario ya existe
            const existingUser = await this.userRepository.findByEmail(value.email);
            if (existingUser) {
                throw new errorHandler_1.AppError('El usuario ya existe', 409);
            }
            const user = await this.userRepository.create(value);
            res.status(201).json({
                success: true,
                data: user,
                message: 'Usuario creado exitosamente'
            });
        });
        this.userRepository = new UserRepository_1.UserRepository();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map