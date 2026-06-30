import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdmin } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "UNAUTHORIZED"
      }, { status: 401 });
    }

    const body = await req.json();

    if (!body.currentPassword || !body.newPassword) {
      return NextResponse.json({
        success: false,
        message: "INVALID INPUT"
      }, { status: 400 });
    }

    const match = await bcrypt.compare(
      body.currentPassword,
      admin.password
    );

    if (!match) {
      return NextResponse.json({
        success: false,
        message: "WRONG PASSWORD"
      }, { status: 400 });
    }

    const hashed = await bcrypt.hash(body.newPassword, 10);

    return NextResponse.json({
      success: true,
      message: "PASSWORD UPDATED"
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "SERVER ERROR"
    }, { status: 500 });
  }
}
