import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function GET() {
  await requireAdminApi();
  try {
    const [payments]: any = await db.query(`
      SELECT
        p.id,
        p.order_id,
        p.customer_id,
        p.invoice_id,
        p.gateway,
        p.txid,
        p.transaction_id,
        p.amount,
        p.status,
        p.verified_by,
        p.verified_at,
        p.created_at,
        c.full_name,
        c.email,
        o.order_number,
        i.invoice_no
      FROM payments p
      LEFT JOIN customers c
        ON c.id = p.customer_id
      LEFT JOIN orders o
        ON o.id = p.order_id
      LEFT JOIN invoices i
        ON i.id = p.invoice_id
      ORDER BY p.id DESC
    `);

    return NextResponse.json({
      success: true,
      payments
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
