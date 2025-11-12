import axios from 'axios';

// URL de tu worker en Railway
const RAILWAY_API_URL = 'https://tu-worker.railway.app/api';

/**
 * Enviar token FCM al backend
 */
export const registerDevice = async (fcmToken) => {
  try {
    const response = await axios.post(`${RAILWAY_API_URL}/register-device`, {
      token: fcmToken,
      platform: 'android',
      timestamp: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar dispositivo:', error);
    return null;
  }
};

/**
 * Obtener estadísticas del worker
 */
export const getWorkerStats = async () => {
  try {
    const response = await axios.get(`${RAILWAY_API_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return null;
  }
};

/**
 * Obtener pares monitoreados
 */
export const getMonitoredPairs = async () => {
  try {
    const response = await axios.get(`${RAILWAY_API_URL}/pairs`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pares:', error);
    return [];
  }
};

/**
 * Health check del worker
 */
export const checkWorkerHealth = async () => {
  try {
    const response = await axios.get(`${RAILWAY_API_URL}/health`);
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Error en health check:', error);
    return false;
  }
};

export default {
  registerDevice,
  getWorkerStats,
  getMonitoredPairs,
  checkWorkerHealth,
};
