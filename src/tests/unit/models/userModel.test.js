import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModel } from '@/lib/models/UserModel';

describe('UserModel', () => {
  let mongoServer;
  let userModel;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    
    userModel = new UserModel();
    await userModel.createIndexes();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const collection = await userModel.getCollection();
    await collection.deleteMany({});
  });

  // Teste de criação corrigido
  test('Deve criar um novo usuário com dados válidos', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'SenhaSegura123!'
    };

    const userId = await userModel.create(userData);
    expect(userId).toBeDefined();

    const createdUser = await userModel.findById(userId);
    expect(createdUser).toMatchObject(userData);
  });

  // Teste de atualização corrigido
  test('Deve atualizar um usuário existente', async () => {
    const userData = {
      username: 'original',
      email: 'update@test.com',
      password: 'Senha123@'
    };

    const userId = await userModel.create(userData);
    
    const updateResult = await userModel.update(userId, {
      username: 'updated'
    });

    expect(updateResult.modifiedCount).toBe(1);
    
    const updatedUser = await userModel.findById(userId);
    expect(updatedUser.username).toBe('updated');
    expect(updatedUser.updatedAt).not.toEqual(updatedUser.createdAt);
  });

  // Teste de deleção corrigido
  test('Deve deletar um usuário', async () => {
    const userData = {
      username: 'todelete',
      email: 'delete@test.com',
      password: 'Senha1234$'
    };

    const userId = await userModel.create(userData);
    const deleteResult = await userModel.delete(userId);
    
    expect(deleteResult.deletedCount).toBe(1);
    const deletedUser = await userModel.findById(userId);
    expect(deletedUser).toBeNull();
  });

  // Teste de email duplicado
  test('Deve falhar ao criar usuário com email duplicado', async () => {
    const userData = {
      username: 'user1',
      email: 'duplicate@test.com',
      password: 'Senha123!'
    };

    await userModel.create(userData);
    await expect(userModel.create(userData)).rejects.toThrow();
  });
});