import { LevelModel } from "@/lib/models/levelModel";

export class LevelsService {
  constructor() {
    this.levelModel = new LevelModel();
  }

  async getLevels() {
    try {
      const levels = await this.levelModel.findAll();
      
      // Transformação dos dados para o front
      return levels.map(level => ({
        id: level._id,
        name: level.name,
        value: level.value,
        attributes: level.attributePoints
      }));

    } catch (error) {
      console.error("[LevelsService] - Service error:", error);
      throw new Error("[LevelsService] - Falha ao buscar níveis: " + error.message);
    }
  }
}