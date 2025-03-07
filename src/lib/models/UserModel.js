import { UserSchema } from '@/lib/schemas/userSchema';
import { BasicModel } from '@/lib/models/BasicModel';

export class UserModel extends BasicModel {
  constructor() {
    super('users', UserSchema); // Passa o nome da coleção e o schema
  }

  // Sobrescreve o método createIndexes para adicionar índices específicos
  async createIndexes() {
    await super.createIndexes(); // Chama o método da classe base
    const collection = await this.getCollection();
    await collection.createIndex({ email: 1 }, { unique: true }); // Índice único para email
  }

  // Métodos específicos para UserModel (se necessário)
  async findUserByEmail(email) {
    const collection = await this.getCollection();
    return collection.findOne({ email });
  }
}