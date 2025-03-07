import { connectToDatabase } from '../mongodb';

export class BasicModel {
  constructor(collectionName, schema) {
    this.collectionName = collectionName; // Nome da coleção
    this.schema = schema; // Schema de validação
  }

  // Método para obter a coleção
  async getCollection() {
    const db = await connectToDatabase();
    return db.collection(this.collectionName);
  }

  // Método para validar os dados
  async validate(data) {
    return this.schema.parse(data); // Valida os dados usando o schema
  }

  // Método para criar índices (pode ser sobrescrito pelas classes filhas)
  async createIndexes() {
    const collection = await this.getCollection();
    await collection.createIndex({ createdAt: -1 }); // Índice padrão
  }

  // Método para buscar um documento por ID
  async findById(id) {
    const collection = await this.getCollection();
    return collection.findOne({ _id: id });
  }

  // Método para criar um novo documento
  async create(data) {
    const validatedData = await this.validate(data);
    const collection = await this.getCollection();
    const result = await collection.insertOne(validatedData);
    return result.insertedId;
  }

  // Método para atualizar um documento
  async update(id, updateData) {
    const validatedData = await this.validate(updateData);
    const collection = await this.getCollection();
    return collection.updateOne(
      { _id: id },
      { $set: { ...validatedData, updatedAt: new Date() } }
    );
  }

  // Método para deletar um documento
  async delete(id) {
    const collection = await this.getCollection();
    return collection.deleteOne({ _id: id });
  }
}