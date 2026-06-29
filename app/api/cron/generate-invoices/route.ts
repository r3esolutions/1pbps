import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  try {

    const [services]: any = await db.query(`
      SELECT *
      FROM orders
      WHERE
        service_status='Active'
        AND next_due_date<=CURDATE()
    `);

    let generated = 0;

    for (const service of services) {

      const [existing]: any = await db.query(
        `
        SELECT id
        FROM invoices
        WHERE
          order_id=?
          AND status='unpaid'
        LIMIT 1
        `,
        [service.id]
      );

      if (existing.length) {
        continue;
      }

      const invoiceNo =
        "INV-" +
        Date.now() +
        "-" +
        service.id;

      await db.query(
        `
        INSERT INTO invoices
        (
          customer_id,
          order_id,
          invoice_no,
          total,
          status,
          due_date,
          created_at
        )
        VALUES
        (
          ?,?,?,?,?,CURDATE(),NOW()
        )
        `,
        [
          service.customer_id,
          service.id,
          invoiceNo,
          service.total,
          "unpaid"
        ]
      );

      generated++;
    }

    return NextResponse.json({
      success: true,
      generated
    });

  } catch (err:any) {

    return NextResponse.json({
      success: false,
      error: err.message
    });

  }
}
