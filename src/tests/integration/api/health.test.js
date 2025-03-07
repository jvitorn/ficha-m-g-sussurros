// src/tests/integration/api/health.test.js
import { GET } from '@/app/api/health/route';
import { connectToDatabase } from '@/lib/mongodb';

// Mock do MongoDB
jest.mock('@/lib/mongodb', () => ({
  connectToDatabase: jest.fn()
}));

describe('GET /api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Deve retornar status 200 quando o banco está conectado', async () => {
    // Mock de sucesso
    connectToDatabase.mockResolvedValue({
      command: jest.fn().mockResolvedValue({ ok: 1 })
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      status: 'online',
      database: 'connected',
      timestamp: expect.any(String)
    });
  });

  test('Deve retornar status 503 quando o banco está desconectado', async () => {
    // Mock de falha
    connectToDatabase.mockRejectedValue(new Error('Connection failed'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data).toEqual({
      status: 'degraded',
      database: 'disconnected',
      error: 'Connection failed',
      timestamp: expect.any(String)
    });
  });
});