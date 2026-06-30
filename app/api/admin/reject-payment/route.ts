import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function POST(req: Request) {
  await requireAdminApi();
  try {
    const body = await req.json();

    await db.query("START TRANSACTION");

    await db.query(
      `
      UPDATE orders
      SET
        payment_status='Rejected',
        status='Cancelled'
      WHERE id=?
      `,
      [body.id]
    );

    await db.query(
      `
      UPDATE payments
      SET
        status='Rejected',
        rejection_reason=?,
        updated_at=NOW()
      WHERE order_id=?
      `,
      [
        body.reason || "Rejected by Admin",
        body.id
      ]
    );

    await db.query(
      `
      INSERT INTO admin_activity_logs
      (
        admin_id,
        action,
        ip_address
      )
      VALUES
      (
        NULL,
        ?,
        '127.0.0.1'
      )
      `,
      [
        "Payment rejected - Order " + body.id
      ]
    );

    await db.query("COMMIT");

    return NextResponse.json({
      success:true
    });

  } catch(error:any) {

    await db.query("ROLLBACK");

    return NextResponse.json({
      success:false,
      error:error.message
    });
  }
}
