// src/lib/models/RaceModel.ts
import { RaceSchema } from "@/lib/schemas/raceSchema";
import { BasicModel } from "@/lib/models/BasicModel";

export class RaceModel extends BasicModel {
  constructor() {
    super("races", RaceSchema);
  }

  async createIndexes() {
    await super.createIndexes();
    const collection = await this.getCollection();
    await collection.createIndex({ name: 1 }, { unique: true });
  }

  async findWithName(name) {
    return this.find({ name: /name/ });
  }
}
