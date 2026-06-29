import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl;

  if (
    pathname === "/login" ||
    pathname === "/admin/login"
  ) {
    return withHeaders(NextResponse.next());
  }

  const token = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("admin_token")?.value;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return withHeaders(NextResponse.next());
}

function withHeaders(res: NextResponse) {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*"
  ]
};
