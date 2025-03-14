// business/characterSheetService.js
import { CharacterSheetModel } from "@/lib/models/characterSheetModel";
import { UserModel } from "@/lib/models/userModel";

export class CharacterSheetService {
  constructor() {
    this.characterSheetModel = new CharacterSheetModel();
    this.userModel = new UserModel();
  }

  async create(data, userId) {
    try {
      // Verifica se o usuário existe e tem permissão
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Monta os dados da ficha
      const sheetData = {
        ...data,
        userId, // Associa a ficha ao usuário
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Cria a ficha no banco de dados
      return await this.characterSheetModel.create(sheetData);
    } catch (error) {
      console.error("[CharacterSheetService] - Service error:", error);
      throw new Error("Falha ao criar ficha de personagem: " + error.message);
    }
  }
}
