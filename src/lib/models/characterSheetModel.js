// src/lib/models/CharacterSheetModel.ts
import { CharacterSheetSchema } from "@/lib/schemas/characterSheetSchema";
import { BasicModel } from "@/lib/models/BasicModel";

export class CharacterSheetModel extends BasicModel {
  constructor() {
    super("characterSheets", CharacterSheetSchema);
  }

  async createIndexes() {
    await super.createIndexes();
    const collection = await this.getCollection();
    await collection.createIndex({ characterName: 1 });
    await collection.createIndex({ campaignId: 1 });
    await collection.createIndex({ classId: 1 });
  }

  async findByCampaign(campaignId) {
    return this.find({ campaignId });
  }

  async findByPlayer(playerId) {
    return this.find({ playerId });
  }
}
