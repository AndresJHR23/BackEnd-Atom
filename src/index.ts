import { onRequest } from 'firebase-functions/v2/https';
import app from './app';

// Exportar la función de Firebase Functions v2
export const api = onRequest({
  timeoutSeconds: 540,
  memory: '1GiB'
}, app);