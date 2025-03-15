// src/lib/schemas/objectIdSchema.js
import { z } from "zod";
import { ObjectId } from "mongodb";

export const objectIdSchema = z
  .custom((value) => {
    // Aceita strings no formato HEX de 24 caracteres
    if (typeof value === "string" && ObjectId.isValid(value)) {
      return new ObjectId(value);
    }

    // Aceita instâncias de ObjectId diretamente
    if (value instanceof ObjectId) {
      return value;
    }

    throw new Error("Formato de ObjectId inválido");
  })
  .transform((value) => {
    // Garante a conversão final para ObjectId
    return value instanceof ObjectId ? value : new ObjectId(value);
  });
