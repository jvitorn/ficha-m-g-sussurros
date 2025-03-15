import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const publicRoutes = Object.freeze([
  Object.freeze({ path: "/signin", whenAuthenticated: "redirect" }),
  Object.freeze({ path: "/register", whenAuthenticated: "redirect" }),
  Object.freeze({ path: "/", whenAuthenticated: "next" })
]);

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/signin";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = req.cookies.get("authToken");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    try {
      const decodedToken = jwtDecode(authToken.value);
      const currentTime = Date.now() / 1000; // Tempo atual em segundos

      // Verifica se o token expirou
      if (decodedToken.exp < currentTime) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};