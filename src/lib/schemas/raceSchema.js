import { z } from "zod";

export const RaceSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().min(3, "Name too short").max(100, "Name too long"),
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
