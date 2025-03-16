// app/api/sheets/controllers/levelsController.js
import { NextResponse } from "next/server";
import { SheetsService } from "../business/sheetsService";

export class SheetsCharacterController {
  constructor() {
    this.sheetsService = new SheetsService();
  }

  async getAll(req) {
    try {
      // Se precisar de parâmetros de query
      const levels = await this.sheetsService.getLevels();
      const classes = await this.sheetsService.getClasses();
      const subclasses = await this.sheetsService.getSubClasses();
      const races = await this.sheetsService.getRaces();


      return NextResponse.json({
        success: true,
        levels,
        classes,
        subclasses,
        races
      });
    } catch (error) {
      console.error("[SheetsCharacterController] - Erro ao buscar estrutura de ficha:", error);
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
      return "Ficha não encontrada";
    return "Erro ao buscar níveis";
  }
}
