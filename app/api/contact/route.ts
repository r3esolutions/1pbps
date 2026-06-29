import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.query(
      `INSERT INTO leads
      (
        full_name,
        email,
        phone,
        company_name,
        service,
        subject,
        message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        body.full_name,
        body.email,
        body.phone,
        body.company_name,
        body.service,
        body.subject,
        body.message
      ]
    );

    return NextResponse.json({
      success: true
    });

  } catch (error: any) {

    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
