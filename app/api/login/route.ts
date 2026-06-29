import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const [rows]: any = await db.query(
      "SELECT * FROM customers WHERE email = ? LIMIT 1",
      [body.email]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET || "1pbps-secret",
      {
        expiresIn: "7d"
      }
    );

    const response = NextResponse.json({
      success: true,
      customer: {
        id: user.id,
        name: user.full_name,
        email: user.email
      }
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
