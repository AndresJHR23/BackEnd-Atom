"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
class FirebaseConfig {
    constructor() {
        try {
            console.log('🔥 Inicializando Firebase Admin...');
            if (!admin.apps.length) {
                admin.initializeApp();
                console.log('✅ Firebase App inicializado');
            }
            // Usar la base de datos por defecto (la misma que usábamos en desarrollo)
            this.db = admin.firestore();
            console.log('✅ Firestore configurado - usando base (default)');
        }
        catch (error) {
            console.error('❌ Error inicializando Firebase:', error);
            throw error;
        }
    }
    static getInstance() {
        if (!FirebaseConfig.instance) {
            FirebaseConfig.instance = new FirebaseConfig();
        }
        return FirebaseConfig.instance;
    }
    getFirestore() {
        return this.db;
    }
    // Método para verificar conexión
    async testConnection() {
        try {
            console.log('🧪 Probando conexión a Firestore...');
            await this.db.collection('_test').doc('connection').get();
            console.log('✅ Conexión a Firestore exitosa');
            return true;
        }
        catch (error) {
            console.error('❌ Error de conexión a Firestore:', error);
            return false;
        }
    }
}
exports.default = FirebaseConfig;
//# sourceMappingURL=firebase.js.map