// UserService.js
import { UserModel } from "@/lib/models/UserModel";
import jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs");

export class UserService {
  constructor() {
    this.userModel = new UserModel();
    this.jwtConfig = {
      expiresIn: "1h",
      algorithm: "HS256",
      issuer: "magos-grimorios-api",
      audience: "web-client",
    };
  }

  async listUsers() {
    try {
      const collection = await this.userModel.getCollection();
      const cursor = collection.find({});
      return await cursor.toArray();
    } catch (error) {
      throw new Error("Falha ao listar usuários: " + error.message);
    }
  }

  async authenticate(username, password) {
    try {
      const user = await this.userModel.findUserByUsername(username);

      if (!user) throw new Error("Credenciais inválidas");
      if (!user.password)
        throw new Error("Usuário não configurado corretamente");

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error("Credenciais inválidas");

      return {
        token: this.generateToken(user),
        user: this.sanitizeUser(user),
      };
    } catch (error) {
      console.error("[UserService] - [authenticate] Auth error:", error);
      throw new Error(error.message);
    }
  }
  async register(userData) {
    try {
      const finalData = { 
        ...userData,
        role: 'player' // Sobrescreve qualquer valor enviado
      };
      // Verifica se usuário já existe
      const existingUser = await this.userModel.findUserByUsername(
        finalData.username
      );
      if (existingUser) throw new Error("Nome de usuário já está em uso");

      // Verifica se e-mail já existe
      const existingEmail = await this.userModel.findUserByEmail(
        userData.email
      );
      console.log('existingEmail',existingEmail)
      if (existingEmail) throw new Error("E-mail já está em uso");

      // Hash da senha
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      // Cria usuário
      return await this.userModel.createUser({
        ...finalData,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        campaigns: [],
      });
    } catch (error) {
      console.error("[UserService] - [register] Registration error:", error);
      throw new Error(error.message);
    }
  }
  generateToken(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  sanitizeUser(user) {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
