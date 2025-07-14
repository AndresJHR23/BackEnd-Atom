import * as admin from 'firebase-admin';

class FirebaseConfig {
  private static instance: FirebaseConfig;
  private db: admin.firestore.Firestore;

  private constructor() {
    try {
      console.log('🔥 Inicializando Firebase Admin...');
      
      if (!admin.apps.length) {
        admin.initializeApp();
        console.log('✅ Firebase App inicializado');
      }
      
      // Usar la base de datos por defecto (la misma que usábamos en desarrollo)
      this.db = admin.firestore();
      
      console.log('✅ Firestore configurado - usando base (default)');
      
    } catch (error) {
      console.error('❌ Error inicializando Firebase:', error);
      throw error;
    }
  }

  public static getInstance(): FirebaseConfig {
    if (!FirebaseConfig.instance) {
      FirebaseConfig.instance = new FirebaseConfig();
    }
    return FirebaseConfig.instance;
  }

  public getFirestore(): admin.firestore.Firestore {
    return this.db;
  }

  // Método para verificar conexión
  public async testConnection(): Promise<boolean> {
    try {
      console.log('🧪 Probando conexión a Firestore...');
      await this.db.collection('_test').doc('connection').get();
      console.log('✅ Conexión a Firestore exitosa');
      return true;
    } catch (error) {
      console.error('❌ Error de conexión a Firestore:', error);
      return false;
    }
  }
}

export default FirebaseConfig;