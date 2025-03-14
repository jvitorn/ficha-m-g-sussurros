import { z } from "zod";

export const SpellSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().min(3, "Name too short").max(100, "Name too long"),
    description: z.string().optional(),
    level: z.number().int().min(1, "Level must be at least 1"),
    unique: z.boolean().default(false),
    classIds: z.array(z.string().uuid()).default([]).optional(), // Allowed classes
    subclassIds: z.array(z.string().uuid()).default([]).optional(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })
  .strict();

export const SpellUpdateSchema = SpellSchema.omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true,
  });
