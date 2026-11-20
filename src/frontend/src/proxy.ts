import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/find-game", "/profile"]
const publicRoutes = ["/", "/login", "/home", "/how-to-play", "/create-account"]

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path); 
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).has("session");

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
