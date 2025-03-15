import { z } from "zod";
import { objectIdSchema } from "./objectIdSchema.js";
export const RaceSchema = z
  .object({
    _id: objectIdSchema.optional(),
    name: z.string().min(3, "Nome muito curto").max(100, "Nome muito longo"),
    description: z.string().optional(), // Adicione esta linha
    history: z.string().optional(),
    advantages: z.array(z.string()).default([]).optional(),
    disadvantages: z.array(z.string()).default([]).optional(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })
  .strict();

export const RaceUpdateSchema = RaceSchema.omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true,
  });
