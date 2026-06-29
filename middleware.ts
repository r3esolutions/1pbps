import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;

  // Allow login pages
  if (
    pathname === "/login" ||
    pathname === "/admin/login"
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("admin_token")?.value;

  if (
    pathname.startsWith("/dashboard") &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  if (
    pathname.startsWith("/admin") &&
    !adminToken
  ) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*"
  ]
};
