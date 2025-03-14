// controllers/userAuthenticateController.js
import { NextResponse } from "next/server";
import { UserService } from "../business/userService";
const { AuthSchema } = require("@/lib/schemas/authSchema");

export class UserAuthenticateController {
  constructor() {
    this.userService = new UserService();
  }

  async auth(req) {
    try {
      const input = await req.json();

      // Validação com Zod
      const validatedData = AuthSchema.parse(input);

      const { token, user } = await this.userService.authenticate(
        validatedData.username,
        validatedData.password
      );

      return NextResponse.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[UserAuthenticateController] - Erro na autenticação:", error);
      const status =
        error.name === "ZodError"
          ? 422
          : error.message.includes("credenciais")
          ? 401
          : 500;

      return NextResponse.json(
        { error: this.getErrorMessage(error) },
        { status }
      );
    }
  }

  getErrorMessage(error) {
    if (error.name === "ZodError") return "Dados inválidos";
    if (error.message.includes("Usuário") || error.message.includes("Senha")) {
      return "Credenciais inválidas";
    }
    return "Erro na autenticação";
  }
}
