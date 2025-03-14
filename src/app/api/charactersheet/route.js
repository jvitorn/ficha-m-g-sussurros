// api/charactersheet/route.js
import { authMiddleware, requireRole } from '@/middleware/auth';
import { CharacterSheetController } from './controllers/characterSheet';

const characterSheetController = new CharacterSheetController();

export async function POST(request) {
  // Encadeia os middlewares
  const authResponse = await authMiddleware(request);
  if (authResponse.status !== 200) return authResponse;

  const roleResponse = await requireRole(['player', 'gm'])(request);
  if (roleResponse.status !== 200) return roleResponse;

  return characterSheetController.create(request);
}