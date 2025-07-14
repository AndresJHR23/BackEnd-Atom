import { Task, CreateTaskRequest, UpdateTaskRequest } from '../models';
import FirebaseConfig from '../config/firebase';
import { AppError } from '../utils/errorHandler';

export class TaskRepository {
  private db = FirebaseConfig.getInstance().getFirestore();
  private collection = 'tasks';

  async findByUserId(userId: string): Promise<Task[]> {
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
        } as Task;
      });
    } catch (error) {
      console.error('Error finding tasks by user ID:', error);
      throw new AppError('Error al obtener tareas', 500);
    }
  }

  async create(taskData: CreateTaskRequest): Promise<Task> {
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
      } as Task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new AppError('Error al crear tarea', 500);
    }
  }

  async update(id: string, updateData: UpdateTaskRequest): Promise<Task> {
    try {
      const docRef = this.db.collection(this.collection).doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw new AppError('Tarea no encontrada', 404);
      }

      const now = new Date();
      await docRef.update({
        ...updateData,
        updatedAt: now
      });

      const updatedDoc = await docRef.get();
      const data = updatedDoc.data()!;

      return {
        id: updatedDoc.id,
        title: data.title,
        description: data.description,
        completed: data.completed,
        userId: data.userId,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Task;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error updating task:', error);
      throw new AppError('Error al actualizar tarea', 500);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = this.db.collection(this.collection).doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw new AppError('Tarea no encontrada', 404);
      }

      await docRef.delete();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error deleting task:', error);
      throw new AppError('Error al eliminar tarea', 500);
    }
  }

  async findById(id: string): Promise<Task | null> {
    try {
      const doc = await this.db.collection(this.collection).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        completed: data.completed,
        userId: data.userId,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Task;
    } catch (error) {
      console.error('Error finding task by ID:', error);
      throw new AppError('Error al buscar tarea', 500);
    }
  }
}