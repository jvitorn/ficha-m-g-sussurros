// src/lib/models/ClassModel.ts
import { ClassSchema } from "@/lib/schemas/classSchema";
import { BasicModel } from "@/lib/models/BasicModel";

export class ClassModel extends BasicModel {
  constructor() {
    super("classes", ClassSchema);
  }

  async createIndexes() {
    await super.createIndexes();
    const collection = await this.getCollection();
    await collection.createIndex({ name: 1 }, { unique: true });
  }
}
