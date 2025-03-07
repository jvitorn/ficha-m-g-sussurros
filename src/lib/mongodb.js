import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
  tls: true, // ← Adicione isso
  tlsAllowInvalidCertificates: false, // ← Mantenha false para produção
});

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DBNAME);
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Erro detalhado:', error);
    throw new Error('Falha ao conectar ao banco de dados');
  }
}