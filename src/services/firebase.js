import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// Referencia a la colección de señales
const signalsCollection = firestore().collection('trading_signals');

/**
 * Suscribirse a señales en tiempo real
 */
export const subscribeToSignals = (callback) => {
  const unsubscribe = signalsCollection
    .orderBy('timestamp', 'desc')
    .limit(20)
    .onSnapshot(
      (snapshot) => {
        const signals = [];
        snapshot.forEach((doc) => {
          signals.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        callback(signals);
      },
      (error) => {
        console.error('Error al escuchar señales:', error);
      }
    );

  return unsubscribe;
};

/**
 * Obtener una señal específica
 */
export const getSignal = async (signalId) => {
  try {
    const doc = await signalsCollection.doc(signalId).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error al obtener señal:', error);
    return null;
  }
};

/**
 * Configurar notificaciones push
 */
export const setupNotifications = async () => {
  try {
    // Solicitar permisos
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // Obtener token FCM
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      
      // Aquí podrías enviar el token a tu backend
      // await sendTokenToRailway(token);
      
      return token;
    }
  } catch (error) {
    console.error('Error al configurar notificaciones:', error);
  }
  return null;
};

/**
 * Manejar notificaciones en primer plano
 */
export const onMessageReceived = (callback) => {
  return messaging().onMessage(async (remoteMessage) => {
    console.log('Notificación recibida:', remoteMessage);
    callback(remoteMessage);
  });
};

/**
 * Manejar notificaciones en segundo plano
 */
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Notificación en segundo plano:', remoteMessage);
});

export default {
  subscribeToSignals,
  getSignal,
  setupNotifications,
  onMessageReceived,
};
