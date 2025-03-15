import { z } from "zod";
import { objectIdSchema } from "./objectIdSchema.js";

export const SubclassSchema = z
  .object({
    _id: objectIdSchema.optional(),
    name: z.string().min(3, "Nome muito curto").max(100, "Nome muito longo"),
    description: z.string().optional(),
    classId: objectIdSchema, // Agora aceita ObjectId ou string
    advantages: z.array(z.string()).default([]),
    disadvantages: z.array(z.string()).default([]),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })
  .strict();

export const SubclassUpdateSchema = SubclassSchema.omit({
  id: true,
  createdAt: true,
})
  .partial()
  .required({
    updatedAt: true,
  });
