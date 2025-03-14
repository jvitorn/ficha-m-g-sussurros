// controllers/characterSheet.js
import { NextResponse } from "next/server";
import { CharacterSheetService } from "../business/characterSheetService";
import { CharacterSheetSchema } from "@/lib/schemas/characterSheetSchema";

export class CharacterSheetController {
  constructor() {
    this.characterSheetService = new CharacterSheetService();
  }

  async create(req) {
    try {
      const userId = req.user.userId;
      const input = await req.json();

      // Validação com Zod
      const validatedData = CharacterSheetSchema.parse(input);

      const fichaCreated = await this.characterSheetService.create(
        validatedData,
        userId
      );

      return NextResponse.json(fichaCreated, { status: 201 });
    } catch (error) {
      console.error("Erro ao criar [character sheet]:", error);
      return NextResponse.json(
        { error: error.message || "Erro interno do servidor" },
        { status: error.name === "ZodError" ? 422 : 500 }
      );
    }
  }
}
