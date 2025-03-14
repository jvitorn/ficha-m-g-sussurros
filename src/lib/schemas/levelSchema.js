import { z } from "zod";

export const LevelSchema = z
  .object({
    id: z.string().uuid().optional(),
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
