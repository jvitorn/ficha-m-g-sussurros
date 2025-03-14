// src/lib/models/LevelModel.ts
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
    await collection.createIndex({ attributePoints: 1 });
  }

  async findAll() {
    return this.find({});
  }

  async findLvMax(minLevel = 0, maxLevel) {
    return this.find({
      level: {
        $gte: minLevel,
        $lte: maxLevel,
      },
    });
  }
}
