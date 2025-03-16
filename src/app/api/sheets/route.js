// app/api/sheets/route.js
import { SheetsCharacterController } from "./controllers/sheets";

const sheetsCharacterController = new SheetsCharacterController();

export async function GET(request) {
  return sheetsCharacterController.getAll(request);
}
