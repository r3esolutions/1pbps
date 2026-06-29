import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function GET() {
  await requireAdminApi();
  try {

    const [rows]: any = await db.query(`
      SELECT
        id,
        full_name,
        email,
        phone,
        service_interest,
        status,
        created_at
      FROM leads
      ORDER BY id DESC
    `);

    return NextResponse.json({
      success: true,
      leads: rows
    });

  } catch (error:any) {

    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
