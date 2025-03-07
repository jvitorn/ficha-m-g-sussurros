import { UserController } from './controllers/userController';

const userController = new UserController();

// GET /api/users - Lista todos os usuários
export async function GET() {
  return userController.listUsers();
}
