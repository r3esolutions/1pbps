import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {

  try {

    const [orders]: any = await db.query(`
      SELECT
        o.id,
        o.order_number,
        o.server_plan,
        o.location,
        o.total,
        o.payment_status,
        o.txid,
        o.provisioning_status,
        c.full_name,
        c.email
      FROM orders o
      LEFT JOIN customers c
      ON c.id=o.customer_id
      ORDER BY o.id DESC
    `);

    return NextResponse.json({
      success:true,
      orders
    });

  } catch(error){

    return NextResponse.json({
      success:false
    });

  }

}
