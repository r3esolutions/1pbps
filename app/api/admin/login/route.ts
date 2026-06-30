import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    let body;
try { body = await req.json(); } catch(e) { body = {}; }

    const [rows]: any = await db.query(
      "SELECT * FROM admin_users WHERE email=? LIMIT 1",
      [body.email]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    const admin = rows[0];

    const valid = await bcrypt.compare(body.password, admin.password);

    if (!valid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: admin.role,
        email: admin.email
      },
      process.env.JWT_SECRET || "1pbps-admin",
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      domain: undefined,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return res;

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message
    });
  }
}
