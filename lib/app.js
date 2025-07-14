"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const environment_1 = require("./config/environment");
const app = (0, express_1.default)();
// Middlewares de seguridad
app.use((0, helmet_1.default)());
// CORS más permisivo para debug
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Permitir requests sin origin (como Postman)
        if (!origin)
            return callback(null, true);
        // En producción, verificar origins permitidos
        if (environment_1.config.nodeEnv === 'production') {
            const allowedOrigins = [
                'https://atomfullstack.web.app',
                'https://atomfullstack.firebaseapp.com'
            ];
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                console.log('❌ CORS blocked origin:', origin);
                callback(null, true); // Temporal: permitir todos los origins
            }
        }
        else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
// Middlewares de parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas de la API
app.use('/api/users', userRoutes_1.default);
app.use('/api/tasks', taskRoutes_1.default);
// Ruta de salud
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: environment_1.config.nodeEnv
    });
});
// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Ruta no encontrada'
    });
});
// Manejo global de errores
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map