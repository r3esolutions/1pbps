import crypto from "crypto";
import { cookies } from "next/headers";

export async function createCsrfToken() {
  const token = crypto.randomBytes(32).toString("hex");

  const store = await cookies();

  store.set("csrf_token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });

  return token;
}

export async function verifyCsrfToken(formToken: string) {
  const store = await cookies();

  const cookieToken = store.get("csrf_token")?.value;

  return !!cookieToken && cookieToken === formToken;
}
