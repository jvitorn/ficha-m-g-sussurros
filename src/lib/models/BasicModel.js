import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { connectToDatabase } from '../mongodb';

export class BasicModel {
  constructor(collectionName, schema) {
    this.collectionName = collectionName;
    this.schema = schema;
  }

  async getCollection() {
    const db = await connectToDatabase();
    return db.collection(this.collectionName);
  }

  async validate(data) {
    return this.schema.parse(data);
  }

  async createIndexes() {
    const collection = await this.getCollection();
    await collection.createIndex({ createdAt: -1 });
  }

  async findById(id) {
    const collection = await this.getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findAll() {
    const collection = await this.getCollection();
    const cursor = await collection.find({});
    return await cursor.toArray();
  }

  async create(data) {
    const validatedData = await this.validate(data);
    const collection = await this.getCollection();
    const result = await collection.insertOne({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result.insertedId.toString();
  }

 // No método update, modifique para:
async update(id, updateData) {
  // Crie um schema parcial baseado no schema original
  const partialSchema = this.schema instanceof z.ZodObject 
    ? this.schema.partial() 
    : z.object({}).passthrough(); // Fallback seguro

  const validatedData = await partialSchema.parse(updateData);
  
  const collection = await this.getCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: { 
        ...validatedData,
        updatedAt: new Date() 
      } 
    }
  );
  return result;
}

  async delete(id) {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  }
}