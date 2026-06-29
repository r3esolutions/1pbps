import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/src/lib/db";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const [rows]: any = await db.query(
      "SELECT * FROM admin_users WHERE email=? LIMIT 1",
      [body.email]
    );

    if (!rows.length) {
      return NextResponse.json({
        success:false,
        message:"Invalid credentials"
      });
    }

    const admin = rows[0];

    const valid = await bcrypt.compare(
      body.password,
      admin.password
    );

    if (!valid) {
      return NextResponse.json({
        success:false,
        message:"Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: admin.role,
        email: admin.email
      },
      process.env.JWT_SECRET || "1pbps-admin",
      {
        expiresIn:"7d"
      }
    );

    const response = NextResponse.json({
      success:true
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return response;

  } catch(error:any){

    return NextResponse.json({
      success:false,
      error:error.message
    });
  }
}
