import app from './app';
import { config } from './config/environment';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Modo: ${config.nodeEnv}`);
});