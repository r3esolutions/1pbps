import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    await requireCustomer();

    const body = await req.json();

    await db.query(
      `
      UPDATE orders
      SET
        txid = ?,
        payment_status = 'Awaiting Verification',
        status = 'Pending Verification'
      WHERE order_number = ?
      `,
      [
        body.txid,
        body.order_number
      ]
    );

    return NextResponse.json({
      success: true
    });

  } catch (error:any) {
    return NextResponse.json({
      success:false,
      error:error.message
    });
  }
}
