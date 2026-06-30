import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized"
      });
    }

    const body = await req.json();

    // Example ticket insert (safe fallback)
    await db.query(
      "INSERT INTO tickets (user_id, subject, message) VALUES (?, ?, ?)",
      [admin.id, body.subject, body.message]
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
