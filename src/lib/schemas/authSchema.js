// lib/schemas/authSchema.js
const { z } = require("zod");

const AuthSchema = z.object({
  username: z
    .string()
    .min(3, "Nome de usuário muito curto")
    .max(30, "Nome de usuário muito longo")
    .regex(/^[a-z0-9_]+$/, "Apenas letras minúsculas, números e underscore"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(100, "Senha muito longa"),
});

module.exports = { AuthSchema };
