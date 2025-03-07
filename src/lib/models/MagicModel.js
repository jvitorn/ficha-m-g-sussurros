import { MagicSchema } from '@/lib/schemas/magicSchema';
import { BasicModel } from '@/lib/models/BasicModel';

export class MagicModel extends BasicModel {
  constructor() {
    super('magics', MagicSchema); // Passa o nome da coleção e o schema
  }

  // Sobrescreve o método createIndexes para adicionar índices específicos
  async createIndexes() {
    await super.createIndexes(); // Chama o método da classe base
    const collection = await this.getCollection();
    await collection.createIndex({ name: 1 }, { unique: true }); // Índice único para name
  }

  // Métodos específicos para MagicModel (se necessário)
  async findMagicByName(name) {
    const collection = await this.getCollection();
    return collection.findOne({ name });
  }
}