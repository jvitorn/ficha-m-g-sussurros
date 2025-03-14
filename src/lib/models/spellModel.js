// src/lib/models/SpellModel.ts
import { SpellSchema } from "@/lib/schemas/spellSchema";
import { BasicModel } from "@/lib/models/BasicModel";

export class SpellModel extends BasicModel {
  constructor() {
    super("spells", SpellSchema);
  }

  async createIndexes() {
    await super.createIndexes();
    const collection = await this.getCollection();
    await collection.createIndex({ name: 1 }, { unique: true });
    await collection.createIndex({ level: 1 });
  }

  async findByLevel(minLevel, maxLevel) {
    return this.find({
      level: {
        $gte: minLevel,
        $lte: maxLevel,
      },
    });
  }
}
