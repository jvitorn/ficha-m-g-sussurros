// UserService.js
import { UserModel } from '@/lib/models/UserModal';

export class UserService {
  constructor() {
    this.userModel = new UserModel();
  }

  async listUsers() {
    try {
      const collection = await this.userModel.getCollection();
      const cursor = collection.find({});
      return await cursor.toArray();
    } catch (error) {
      throw new Error('Falha ao listar usuários: ' + error.message);
    }
  }
}