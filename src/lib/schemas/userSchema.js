import { z } from 'zod';

export const UserSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .describe("ID único gerado automaticamente"),
  username: z
    .string()
    .min(3)
    .max(30)
    .describe("Nome de usuário único"),
  email: z
    .string()
    .email()
    .describe("Endereço de e-mail válido"),
  password: z
    .string()
    .min(8)
    .describe("Senha com pelo menos 8 caracteres"),
  createdAt: z
    .date()
    .default(() => new Date())
    .describe("Data de criação do registro"),
  updatedAt: z
    .date()
    .default(() => new Date())
    .describe("Data da última atualização")
}).superRefine((data, ctx) => {
  // Validação customizada: Nome de usuário não pode conter espaços
  if (/\s/.test(data.username)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "🚫 Nome de usuário não pode conter espaços",
      path: ["username"]
    });
  }
});