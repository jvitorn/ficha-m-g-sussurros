// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

let client = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 1000,
    socketTimeoutMS: 1000,
  });

  try {
    await client.connect();
    cachedDb = client.db(process.env.MONGODB_DBNAME);
    return cachedDb;
  } catch (error) {
    throw new Error('Falha na conexão com o banco de dados');
  }
}

// Novo método para fechar conexões
export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    cachedDb = null;
  }
}