import { z } from "zod";

export const SubclassSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().min(3, "Name too short").max(100, "Name too long"),
    description: z.string().optional(),
    advantages: z.array(z.string()).default([]).optional(),
    disadvantages: z.array(z.string()).default([]).optional(),
    classId: z.string().uuid(), // Reference to parent class
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
