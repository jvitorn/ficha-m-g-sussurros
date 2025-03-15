// src/lib/schemas/spellSchema.js
import { z } from "zod";
import { objectIdSchema } from "./objectIdSchema.js";

// Schema para níveis de magia
const SpellLevelSchema = z.object({
  level: z.number().int().min(1).max(8),
  description: z.string().min(10, "Descrição muito curta"),
  ptUso: z.number().int().min(1, "Custo mínimo é 1"),
  usado: z.boolean().default(false),
});

export const SpellSchema = z
  .object({
    _id: objectIdSchema.optional(),
    name: z.string().min(3, "Nome muito curto").max(100, "Nome muito longo"),
    description: z.string().optional(),
    levelSpell: z
      .array(SpellLevelSchema)
      .min(1, "Pelo menos um nível é necessário"), 
    unique: z.boolean().default(false),
    classIds: objectIdSchema.optional().nullable(),
    subclassIds: objectIdSchema.optional().nullable(),
    userId: objectIdSchema.optional(), // Para magias únicas do usuário
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })
  .superRefine((data, ctx) => {
    // Validação customizada: Magias únicas não podem ter classIds ou subclassIds
    if (
      data.unique &&
      (data.classIds?.length > 0 || data.subclassIds?.length > 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Magias únicas não podem estar associadas a classes ou subclasses",
        path: ["unique"],
      });
    }
  });

  export const SpellUpdateSchema = SpellSchema._def.schema
  .omit({ 
    _id: true,
    createdAt: true 
  })
  .partial()
  .required({
    updatedAt: true
  });