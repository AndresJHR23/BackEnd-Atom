import { User, CreateUserRequest } from '../models';
import FirebaseConfig from '../config/firebase';
import { AppError } from '../utils/errorHandler';

export class UserRepository {
  private db = FirebaseConfig.getInstance().getFirestore();
  private collection = 'users';

  async findByEmail(email: string): Promise<User | null> {
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
      } as User;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new AppError('Error al buscar usuario', 500);
    }
  }

  async create(userData: CreateUserRequest): Promise<User> {
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
      } as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new AppError('Error al crear usuario', 500);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const doc = await this.db.collection(this.collection).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return {
        id: doc.id,
        email: data.email,
        createdAt: data.createdAt.toDate()
      } as User;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new AppError('Error al buscar usuario', 500);
    }
  }
}