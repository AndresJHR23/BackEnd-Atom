"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const firebase_1 = __importDefault(require("../config/firebase"));
const errorHandler_1 = require("../utils/errorHandler");
class UserRepository {
    constructor() {
        this.db = firebase_1.default.getInstance().getFirestore();
        this.collection = 'users';
    }
    async findByEmail(email) {
        try {
            const snapshot = await this.db
                .collection(this.collection)
                .where('email', '==', email)
                .limit(1)
                .get();
            if (snapshot.empty) {
                return null;
            }
            const doc = snapshot.docs[0];
            const data = doc.data();
            return {
                id: doc.id,
                email: data.email,
                createdAt: data.createdAt.toDate()
            };
        }
        catch (error) {
            console.error('Error finding user by email:', error);
            throw new errorHandler_1.AppError('Error al buscar usuario', 500);
        }
    }
    async create(userData) {
        try {
            const now = new Date();
            const docRef = await this.db.collection(this.collection).add({
                email: userData.email,
                createdAt: now
            });
            return {
                id: docRef.id,
                email: userData.email,
                createdAt: now
            };
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new errorHandler_1.AppError('Error al crear usuario', 500);
        }
    }
    async findById(id) {
        try {
            const doc = await this.db.collection(this.collection).doc(id).get();
            if (!doc.exists) {
                return null;
            }
            const data = doc.data();
            return {
                id: doc.id,
                email: data.email,
                createdAt: data.createdAt.toDate()
            };
        }
        catch (error) {
            console.error('Error finding user by ID:', error);
            throw new errorHandler_1.AppError('Error al buscar usuario', 500);
        }
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map