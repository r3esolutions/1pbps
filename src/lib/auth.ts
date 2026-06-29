import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import db from "@/src/lib/db";

/* ---------------- CUSTOMER ---------------- */

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

    return rows.length ? rows[0] : null;
  } catch {
    return null;
  }
}

export async function requireCustomer() {
  const customer = await getCurrentCustomer();

  if (!customer) {
    redirect("/login");
  }

  return customer;
}

/* ---------------- ADMIN ---------------- */

export async function getCurrentAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return null;

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "1pbps-admin"
    );

    const [rows]: any = await db.query(
      "SELECT * FROM admin_users WHERE id=? LIMIT 1",
      [decoded.id]
    );

    return rows.length ? rows[0] : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
