import { z } from 'zod';


// Schema principal da magia
export const MagicSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .describe("ID único gerado automaticamente"),
  name: z
    .string()
    .min(3)
    .max(100)
    .describe("Nome da magia"),
  description: z
    .string()
    .max(1000)
    .describe("Descrição geral da magia"),
  class: z
    .string()
    .max(50)
    .describe("Classe principal associada à magia"),
  subclass: z
    .string()
    .max(50)
    .describe("Subclasse/especialização da magia"),
  levels: z
    .array(LevelSchema)
    .min(1)
    .describe("Níveis disponíveis da magia"),
  uniqueMagic: z
    .boolean()
    .describe("Indica se a magia é única (exclusiva para um usuário)"),
  comunMagic: z
    .boolean()
    .describe("Indica se a magia é comum (disponível para todos)"),
  user: z
    .string()
    .uuid()
    .optional()
    .describe("ID do usuário dono (apenas para magias únicas)")
}).superRefine((data, ctx) => {
  // Validação 1: Magia não pode ser única e comum ao mesmo tempo
  if (data.uniqueMagic && data.comunMagic) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "⚠️ A magia não pode ser única e comum simultaneamente",
      path: ["uniqueMagic"]
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "⚠️ A magia não pode ser única e comum simultaneamente",
      path: ["comunMagic"]
    });
  }

  // Validação 2: User obrigatório para magias únicas
  if (data.uniqueMagic && !data.user) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "🔑 ID do usuário é obrigatório para magias únicas",
      path: ["user"]
    });
  }
});