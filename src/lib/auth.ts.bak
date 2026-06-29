import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import db from "@/src/lib/db";

export async function getCurrentCustomer() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "1pbps-secret"
    );

    const [rows]: any = await db.query(
      "SELECT * FROM customers WHERE id=? LIMIT 1",
      [decoded.id]
    );

    if (!rows.length) return null;

    return rows[0];

  } catch {
    return null;
  }
}

export async function requireCustomer() {
  const customer = await getCurrentCustomer();

  if (!customer) {
    throw new Error("UNAUTHORIZED");
  }

  return customer;
}
