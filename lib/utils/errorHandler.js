"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.globalErrorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const globalErrorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message
        });
        return;
    }
    // Error genérico
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
    });
};
exports.globalErrorHandler = globalErrorHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map