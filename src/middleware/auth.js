// middleware/authMiddleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(request) {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "Token de acesso não fornecido" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 401 }
    );
  }
}

// Middleware de permissão (pode ser usado como wrapper)
export function requireRole(roles) {
  return async (request) => {
    const user = request.user;

    if (!user || !roles.includes(user.role)) {
      return NextResponse.json(
        { error: "Acesso não autorizado" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  };
}
