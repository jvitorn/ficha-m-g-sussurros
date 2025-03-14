// src/lib/models/SubclassModel.ts
import { SubclassSchema } from "@/lib/schemas/subclassSchema";
import { BasicModel } from "@/lib/models/BasicModel";

export class SubclassModel extends BasicModel {
  constructor() {
    super("subclasses", SubclassSchema);
  }

  async createIndexes() {
    await super.createIndexes();
    const collection = await this.getCollection();
    await collection.createIndex({ name: 1 }, { unique: true });
    await collection.createIndex({ classId: 1 });
  }

  async findByClass(classId) {
    return this.find({ classId });
  }
}
