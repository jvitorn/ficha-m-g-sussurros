import React from "react";
import { useAuth } from "@/contexts/authContext";

/**
 * Componente que renderiza seus filhos apenas se o papel do usuário for um dos
 * papéis permitidos.
 *
 * @param {string[]} allowedRoles - Array de papéis que podem renderizar o componente.
 * @param {*} children - Filhos do componente.
 *
 * @example
 * <RoleBasedAccess allowedRoles={["admin", "moderador"]}>
 *   <p>Este conteúdo é visível apenas para administradores e moderadores.</p>
 * </RoleBasedAccess>
 */
const RoleBasedAccess = ({ allowedRoles, children }) => {
  const { userRole } = useAuth();

  if (!allowedRoles.includes(userRole)) {
    return null; // Não renderiza nada se o papel não for permitido
  }

  return <>{children}</>; // Renderiza os filhos se o papel for permitido
};

export default RoleBasedAccess;
