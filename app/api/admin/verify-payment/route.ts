import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    await db.query(
      `
      UPDATE orders
      SET
        payment_status='Paid',
        status='Processing',
        provisioning_status='Pending'
      WHERE id=?
      `,
      [body.id]
    );

    const [rows]: any = await db.query(
      `
      SELECT
        o.id,
        o.customer_id,
        o.total,
        c.full_name,
        c.gst_number,
        CONCAT_WS(
          ', ',
          c.address1,
          c.city,
          c.state,
          c.country,
          c.postal_code
        ) billing_address
      FROM orders o
      LEFT JOIN customers c
      ON c.id=o.customer_id
      WHERE o.id=?
      LIMIT 1
      `,
      [body.id]
    );

    if (rows.length) {

      const order = rows[0];

      const [lastInvoice]: any = await db.query(
        "SELECT id FROM invoices ORDER BY id DESC LIMIT 1"
      );

      const invoiceNo =
        "INV-" +
        String(
          ((lastInvoice?.[0]?.id || 0) + 1)
        ).padStart(6,"0");

      await db.query(
        `
        INSERT INTO invoices
        (
          invoice_no,
          customer_id,
          order_id,
          subtotal,
          total,
          status,
          due_date,
          gst_number,
          billing_name,
          billing_address
        )
        VALUES
        (
          ?,?,?,?,?,?,
          CURDATE(),
          ?,?,?
        )
        `,
        [
          invoiceNo,
          order.customer_id,
          order.id,
          order.total,
          order.total,
          "paid",
          order.gst_number,
          order.full_name,
          order.billing_address
        ]
      );
    }

    return NextResponse.json({
      success:true
    });

  } catch(error:any) {
    console.error(error);
    console.log(error);

    return NextResponse.json({
      success:false,
      error:error.message
    });
  }
}
