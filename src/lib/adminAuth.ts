import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import db from "@/src/lib/db";

export async function requireAdminApi(
  roles: string[] = []
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const decoded: any = jwt.verify(
    token,
    process.env.JWT_SECRET || "1pbps-admin"
  );

  const [rows]: any = await db.query(
    "SELECT * FROM admin_users WHERE id=? LIMIT 1",
    [decoded.id]
  );

  if (!rows.length) {
    throw new Error("UNAUTHORIZED");
  }

  const admin = rows[0];

  if (
    roles.length &&
    !roles.includes(admin.role)
  ) {
    throw new Error("FORBIDDEN");
  }

  return admin;
}
