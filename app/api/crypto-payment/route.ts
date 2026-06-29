import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const customer:any = await requireCustomer();
    const body = await req.json();

    const [orders]:any = await db.query(
      `SELECT id FROM orders WHERE order_number=? LIMIT 1`,
      [body.order_number]
    );

    if (!orders.length) {
      return NextResponse.json({
        success:false,
        error:"Order not found"
      });
    }

    const orderId = orders[0].id;

    await db.query(
      `UPDATE orders
       SET txid=?,
           payment_status='Awaiting Verification',
           status='Pending Verification'
       WHERE id=?`,
      [body.txid, orderId]
    );

    await db.query(
      `INSERT INTO payments
      (order_id,customer_id,gateway,txid,transaction_id,amount,status)
      SELECT
        o.id,
        o.customer_id,
        'Crypto',
        ?,
        ?,
        o.total,
        'Awaiting Verification'
      FROM orders o
      WHERE o.id=?`,
      [body.txid, body.txid, orderId]
    );

    return NextResponse.json({ success:true });

  } catch (error:any) {
    return NextResponse.json({
      success:false,
      error:error.message
    });
  }
}
