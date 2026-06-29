import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  try {

    const [rows]: any = await db.query(`
      SELECT
        i.order_id
      FROM invoices i
      INNER JOIN orders o
        ON o.id=i.order_id
      WHERE
        i.status='unpaid'
        AND i.due_date < CURDATE()
        AND o.service_status='Active'
    `);

    let suspended = 0;

    for (const row of rows) {

      await db.query(
        `
        UPDATE orders
        SET
          service_status='Suspended'
        WHERE id=?
        `,
        [row.order_id]
      );

      suspended++;
    }

    return NextResponse.json({
      success: true,
      suspended
    });

  } catch (err:any) {

    return NextResponse.json({
      success: false,
      error: err.message
    });

  }
}
