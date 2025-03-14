// api/register/route.js
import { UserRegisterController } from "../users/controllers/userRegisterController";

const registerController = new UserRegisterController();

export async function POST(request) {
  return registerController.register(request);
}
