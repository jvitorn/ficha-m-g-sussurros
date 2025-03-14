// controllers/userRegisterController.js
import { NextResponse } from "next/server";
import { UserService } from "../business/userService";
const { UserSchema } = require('@/lib/schemas/userSchema');

export class UserRegisterController {
  constructor() {
    this.userService = new UserService();
  }

  async register(req) {
    try {
      const input = await req.json();
      // apenas para validação no front
      if(input.confirmPassword) delete input.confirmPassword;
      // Validação com schema específico de registro
      const validatedData = await UserSchema.parseAsync(input);

      // Força o role para 'player' mesmo se enviado
      const userData = { ...validatedData, role: "player" };

      const newUser = await this.userService.register(userData);

      return NextResponse.json(
        {
          id: newUser.insertedId,
          username: validatedData.username,
          email: validatedData.email,
          role: "player", // Garante o retorno correto
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Erro no registro:", error);
      const status = this.getErrorStatus(error);
      return NextResponse.json(
        { error: this.getErrorMessage(error) },
        { status }
      );
    }
  }

  getErrorStatus(error) {
    if (error.name === "ZodError") return 422;
    if (error.message.includes("já está em uso")) return 409;
    return 500;
  }

  getErrorMessage(error) {
    if (error.name === "ZodError")
      return (
        "Dados inválidos: " + error.errors.map((e) => e.message).join(", ")
      );
    if (error.message.includes("duplicate key"))
      return "Usuário ou e-mail já cadastrado";
    if (error.message.includes("E-mail já está em uso"))
        return "E-mail já cadastrado";  
    if (error.message.includes("Nome de usuário já está em uso"))
        return "Nome de usuário já está em uso";  
    return "Erro ao registrar usuário";
  }
}
