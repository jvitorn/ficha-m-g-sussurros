import { z } from "zod";
import { objectIdSchema } from "./objectIdSchema.js";

export const ClassSchema = z
  .object({
    _id: objectIdSchema.optional(),
    name: z.string().min(3, "Nome muito curto").max(100, "Nome muito longo"),
    description: z.string().optional(),
    advantages: z.array(z.string()).default([]).optional(),
    disadvantages: z.array(z.string()).default([]).optional(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })
  .strict();

// Schema para updates
export const ClassUpdateSchema = ClassSchema.pick({
  name: true,
  description: true,
  advantages: true,
  disadvantages: true,
  updatedAt: true,
})
  .partial()
  .extend({
    updatedAt: z.date().default(() => new Date()),
  });
