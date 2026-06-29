import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  try {
    const [payments]: any = await db.query(`
      SELECT
        p.*,
        c.full_name,
        c.email,
        o.order_number
      FROM payments p
      LEFT JOIN customers c
        ON c.id = p.customer_id
      LEFT JOIN orders o
        ON o.id = p.order_id
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
