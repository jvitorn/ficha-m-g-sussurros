import { z } from "zod";
import { objectIdSchema } from "./objectIdSchema.js";

export const LevelSchema = z
  .object({
    _id: objectIdSchema.optional(),
    name: z.string().min(3, "Name too short").max(100, "Name too long"),
    attributePoints: z
      .number()
      .int()
      .min(0, "Pontos de Atributos não podem ser Negativos"),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })
  .strict();

export const LevelUpdateSchema = LevelSchema.omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true,
  });
