import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function POST(req: Request) {
  await requireAdminApi();
  try {
    const body = await req.json();

    await db.query(
      `
      UPDATE orders
      SET
        hostname=?,
        primary_ip=?,
        username=?,
        server_password=?,
        service_status=?,
        next_due_date=?
      WHERE id=?
      `,
      [
        body.hostname,
        body.primary_ip,
        body.username,
        body.server_password,
        body.service_status,
        body.next_due_date || null,
        body.id
      ]
    );

    return NextResponse.json({ success:true });

  } catch(err:any) {
    return NextResponse.json({
      success:false,
      error:err.message
    });
  }
}
