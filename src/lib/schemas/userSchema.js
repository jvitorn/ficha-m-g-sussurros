import { z } from "zod"

import { objectIdSchema } from "./objectIdSchema.js";

export const UserSchema = z
  .object({
    // Campos existentes
    _id: objectIdSchema.optional(),
    username: z
      .string()
      .min(3, "Nome muito curto")
      .max(30, "Nome muito longo")
      .toLowerCase()
      .refine((value) => !/\s/.test(value), {
        message: "Nome não pode conter espaços",
      }),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Senha precisa de 8+ caracteres"),
    role: z
      .enum(["player", "gm"])
      .default("player"),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),

    // Novos campos
    campanhas: z.array(z.string()).default([]).optional(), // Referências a campanhas
  })
  .strict(); // Impede campos não declarados

// Schema para Atualizações Parciais (PUT/PATCH)
export const UserUpdateSchema = UserSchema.omit({ id: true, createdAt: true }) // Remove campos imutáveis [[1]]
  .partial()
  .required({
    updatedAt: true, // Mantém updatedAt obrigatório [[4]]
  });
