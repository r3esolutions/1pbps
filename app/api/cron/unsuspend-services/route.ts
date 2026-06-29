import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  try {

    const [rows]: any = await db.query(`
      SELECT
        o.id
      FROM orders o
      WHERE
        o.service_status='Suspended'
        AND NOT EXISTS (
          SELECT 1
          FROM invoices i
          WHERE
            i.order_id=o.id
            AND i.status='unpaid'
        )
    `);

    let unsuspended = 0;

    for (const row of rows) {

      await db.query(
        `
        UPDATE orders
        SET
          service_status='Active'
        WHERE id=?
        `,
        [row.id]
      );

      unsuspended++;
    }

    return NextResponse.json({
      success: true,
      unsuspended
    });

  } catch (err:any) {

    return NextResponse.json({
      success: false,
      error: err.message
    });

  }
}
