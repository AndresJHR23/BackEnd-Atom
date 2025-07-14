"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const firebase_1 = __importDefault(require("../config/firebase"));
const errorHandler_1 = require("../utils/errorHandler");
class TaskRepository {
    constructor() {
        this.db = firebase_1.default.getInstance().getFirestore();
        this.collection = 'tasks';
    }
    async findByUserId(userId) {
        try {
            const snapshot = await this.db
                .collection(this.collection)
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.title,
                    description: data.description,
                    completed: data.completed,
                    userId: data.userId,
                    createdAt: data.createdAt.toDate(),
                    updatedAt: data.updatedAt.toDate()
                };
            });
        }
        catch (error) {
            console.error('Error finding tasks by user ID:', error);
            throw new errorHandler_1.AppError('Error al obtener tareas', 500);
        }
    }
    async create(taskData) {
        try {
            const now = new Date();
            const docRef = await this.db.collection(this.collection).add({
                title: taskData.title,
                description: taskData.description,
                userId: taskData.userId,
                completed: false,
                createdAt: now,
                updatedAt: now
            });
            return {
                id: docRef.id,
                title: taskData.title,
                description: taskData.description,
                userId: taskData.userId,
                completed: false,
                createdAt: now,
                updatedAt: now
            };
        }
        catch (error) {
            console.error('Error creating task:', error);
            throw new errorHandler_1.AppError('Error al crear tarea', 500);
        }
    }
    async update(id, updateData) {
        try {
            const docRef = this.db.collection(this.collection).doc(id);
            const doc = await docRef.get();
            if (!doc.exists) {
                throw new errorHandler_1.AppError('Tarea no encontrada', 404);
            }
            const now = new Date();
            await docRef.update(Object.assign(Object.assign({}, updateData), { updatedAt: now }));
            const updatedDoc = await docRef.get();
            const data = updatedDoc.data();
            return {
                id: updatedDoc.id,
                title: data.title,
                description: data.description,
                completed: data.completed,
                userId: data.userId,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate()
            };
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                throw error;
            }
            console.error('Error updating task:', error);
            throw new errorHandler_1.AppError('Error al actualizar tarea', 500);
        }
    }
    async delete(id) {
        try {
            const docRef = this.db.collection(this.collection).doc(id);
            const doc = await docRef.get();
            if (!doc.exists) {
                throw new errorHandler_1.AppError('Tarea no encontrada', 404);
            }
            await docRef.delete();
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                throw error;
            }
            console.error('Error deleting task:', error);
            throw new errorHandler_1.AppError('Error al eliminar tarea', 500);
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
                title: data.title,
                description: data.description,
                completed: data.completed,
                userId: data.userId,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate()
            };
        }
        catch (error) {
            console.error('Error finding task by ID:', error);
            throw new errorHandler_1.AppError('Error al buscar tarea', 500);
        }
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=TaskRepository.js.map