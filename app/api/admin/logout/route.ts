import { NextResponse } from "next/server";

export async function POST() {

  const res = NextResponse.redirect(
    new URL("/admin/login", "http://localhost")
  );

  res.cookies.set("admin_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return res;
}
