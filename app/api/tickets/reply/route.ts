import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function POST(req: Request) {
  try {

    if (!customer) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized"
      });
    }

    const body = await req.json();

    await db.query(
      "INSERT INTO ticket_replies (ticket_id, user_id, message) VALUES (?, ?, ?)",
      [body.ticket_id, admin.id, body.message]
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
