import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import db from "./db";

export async function getAdmin() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "1pbps-admin"
    );

    const [rows]: any = await db.query(
      "SELECT * FROM admin_users WHERE id=? LIMIT 1",
      [decoded.id]
    );

    return rows?.[0] || null;
  } catch {
    return null;
  }
}
