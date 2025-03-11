// UserService.js
import { UserModel } from '@/lib/models/UserModel';
import jwt from 'jsonwebtoken';

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

  async authenticate(username, password) {
    try {
      const user = await this.userModel.findUserByUsername(username);
      
      if (!user) throw new Error('Usuário não encontrado');
      if (password !== user.password) throw new Error('Senha inválida');
      
      return this.generateToken(user);
    } catch (error) {
      throw new Error(`Falha na authenticação: ${error.message}`);
    }
  }

  generateToken(user) {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}