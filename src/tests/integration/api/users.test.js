// src/tests/integration/api/users.test.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GET } from '@/app/api/users/route';

describe('GET /api/users (Integração Real)', () => {
  let mongoServer;
  let originalEnv;

  beforeAll(async () => {
    // 1. Inicia o servidor em memória primeiro
    mongoServer = await MongoMemoryServer.create();
    
    // 2. Configura as variáveis de ambiente ANTES de importar outros módulos
    originalEnv = process.env;
    process.env = {
      ...originalEnv,
      MONGODB_URI: mongoServer.getUri(),
      MONGODB_DBNAME: 'testdb'
    };

    // 3. Recarrega os módulos que dependem das variáveis de ambiente
    jest.resetModules();
    const { connectToDatabase } = await import('@/lib/mongodb');
    const db = await connectToDatabase();

    // 4. Insere dados de teste
    await db.collection('users').insertMany([
      { name: 'Test User 1', email: 'user1@test.com' },
      { name: 'Test User 2', email: 'user2@test.com' }
    ]);
  });

  afterAll(async () => {
    await mongoServer.stop();
    process.env = originalEnv;
  });

  test('Deve retornar lista de usuários', async () => {
    const response = await GET();
    const users = await response.json();

    expect(response.status).toBe(200);
    expect(users).toHaveLength(2);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Test User 1',
          email: 'user1@test.com'
        }),
        expect.objectContaining({
          name: 'Test User 2',
          email: 'user2@test.com'
        })
      ])
    );
  });
});