// src/tests/integration/api/health.test.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GET } from '@/app/api/health/route';

describe('GET /api/health', () => {
  let mongoServer;
  let originalEnv;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    originalEnv = { ...process.env };
    process.env.MONGODB_URI = mongoServer.getUri();
  });

  afterAll(async () => {
    await mongoServer.stop();
    process.env = originalEnv;
  });

  test('Deve retornar status 200 com banco conectado', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.database).toBe('connected');
  });

  test('Deve retornar status 503 quando o banco está offline', async () => {
    // Força reinicialização da conexão
    const { closeConnection } = require('@/lib/mongodb');
    await closeConnection(); // Adicione este método no seu módulo de conexão
    
    process.env.MONGODB_URI = 'mongodb://localhost:27017/nonexistent?serverSelectionTimeoutMS=100';
    
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(503);
    expect(data.database).toBe('disconnected');
  });
});