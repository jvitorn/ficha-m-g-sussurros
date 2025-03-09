import { UserAuthenticateController } from '../users/controllers/userAuthenticateController';

const userAuthenticate = new UserAuthenticateController();

// GET /api/login - localiza o usuario e gera o token de authenticação
export async function POST(request) {
  return userAuthenticate.auth(request);
}
