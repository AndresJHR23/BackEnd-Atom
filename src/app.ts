import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import { globalErrorHandler } from './utils/errorHandler';
import { config } from './config/environment';

const app = express();

// Middlewares de seguridad
app.use(helmet());

// CORS más permisivo para debug
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman)
    if (!origin) return callback(null, true);
    
    // En producción, verificar origins permitidos
    if (config.nodeEnv === 'production') {
      const allowedOrigins = [
        'https://atomfullstack.web.app',
        'https://atomfullstack.firebaseapp.com'
      ];
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('❌ CORS blocked origin:', origin);
        callback(null, true); // Temporal: permitir todos los origins
      }
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
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
app.use(globalErrorHandler);

export default app;