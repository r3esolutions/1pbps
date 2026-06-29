import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/src/lib/db";
import { getCurrentCustomer } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const customer = await getCurrentCustomer();

    if (!customer) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized"
      }, { status: 401 });
    }

    const body = await req.json();

    if (
      !body.currentPassword ||
      !body.newPassword
    ) {
      return NextResponse.json({
        success: false,
        error: "All fields are required"
      });
    }

    const valid = await bcrypt.compare(
      body.currentPassword,
      customer.password
    );

    if (!valid) {
      return NextResponse.json({
        success: false,
        error: "Current password is incorrect"
      });
    }

    const hashed = await bcrypt.hash(
      body.newPassword,
      10
    );

    await db.query(
      "UPDATE customers SET password=? WHERE id=?",
      [hashed, customer.id]
    );

    return NextResponse.json({
      success: true
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    });
  }
}
