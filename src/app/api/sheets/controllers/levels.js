// app/api/sheets/controllers/levelsController.js
import { NextResponse } from "next/server";
import { LevelsService } from "../business/levelsService";

export class LevelsController {
  constructor() {
    this.levelsService = new LevelsService();
  }

  async get(req) {
    try {
      // Se precisar de parâmetros de query
      const levels = await this.levelsService.getLevels();

      return NextResponse.json({
        success: true,
        levels,
      });
    } catch (error) {
      console.error("[LevelsController] - Erro ao buscar níveis:", error);
      return NextResponse.json(
        {
          success: false,
          error: this.getErrorMessage(error),
        },
        { status: this.getErrorStatus(error) }
      );
    }
  }

  getErrorStatus(error) {
    if (error.name === "ZodError") return 422;
    if (error.message.includes("Não encontrado")) return 404;
    return 500;
  }

  getErrorMessage(error) {
    if (error.name === "ZodError") return "Parâmetros inválidos";
    if (error.message.includes("Não encontrado"))
      return "Níveis não encontrados";
    return "Erro ao buscar níveis";
  }
}
