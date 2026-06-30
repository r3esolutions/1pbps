import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function GET() {
  await requireAdminApi();

  try {

    const [rows]: any = await db.query(`
      SELECT
        t.id,
        t.transaction_id,
        t.gateway,
        t.txid,
        t.amount,
        t.currency,
        t.type,
        t.status,
        t.created_at,
        c.full_name,
        c.email,
        o.order_number,
        i.invoice_no
      FROM transactions t
      LEFT JOIN customers c
        ON c.id=t.customer_id
      LEFT JOIN orders o
        ON o.id=t.order_id
      LEFT JOIN invoices i
        ON i.id=t.invoice_id
      ORDER BY t.id DESC
    `);

    return NextResponse.json({
      success:true,
      transactions:rows
    });

  } catch(error:any){

    return NextResponse.json({
      success:false,
      error:error.message
    });

  }

}
