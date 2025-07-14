import dotenv from 'dotenv';

// Solo cargar .env en desarrollo local
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: process.env.NODE_ENV === 'production' 
    ? [
        'https://atomfullstack.web.app', 
        'https://atomfullstack.firebaseapp.com',
        'https://atomfullstack.firebaseapp.com/',
        'https://atomfullstack.web.app/'
      ]
    : ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:8080']
};