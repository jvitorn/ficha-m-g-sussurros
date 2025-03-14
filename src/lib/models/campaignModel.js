// src/lib/models/CampaignModel.ts
import { CampaignSchema } from "@/lib/schemas/campaignSchema";
import { BasicModel } from "@/lib/models/BasicModel";

export class CampaignModel extends BasicModel {
  constructor() {
    super("campaigns", CampaignSchema);
  }

  async createIndexes() {
    await super.createIndexes();
    const collection = await this.getCollection();
    await collection.createIndex({ name: 1 }, { unique: true });
  }

  async findByName(name) {
    return this.findOne({ name });
  }
}
