import { LevelSchema } from "@/lib/schemas/levelSchema";
import { BasicModel } from "@/lib/models/BasicModel";

export class LevelModel extends BasicModel {
  constructor() {
    super("levels", LevelSchema); 
  }

  async createIndexes() {
    await super.createIndexes();
    const collection = await this.getCollection();
    await collection.createIndex({ name: 1 }, { unique: true });
  }


  async findLvMax(minLevel = 0, maxLevel) {
    const collection = await this.getCollection();
    return collection.find({
      level: {
        $gte: minLevel,
        $lte: maxLevel,
      },
    });
  }
}
