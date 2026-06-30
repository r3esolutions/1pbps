import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  try {

    const [orders]: any = await db.query(`
      SELECT
        id,
        customer_id,
        order_number,
        server_plan,
        location
      FROM orders
      WHERE
        payment_status='Paid'
        AND (
          service_status='Pending'
          OR service_status='Provisioning'
        )
    `);

    let processed = 0;

    for (const order of orders) {

      /*
       * TODO:
       * Call your provider API here.
       *
       * Example:
       * const server = await provision(order);
       */

      await db.query(
        `
        UPDATE orders
        SET
          service_status='Provisioning'
        WHERE id=?
        `,
        [order.id]
      );

      processed++;
    }

    return NextResponse.json({
      success: true,
      processed
    });

  } catch (err:any) {

    return NextResponse.json({
      success: false,
      error: err.message
    });

  }
}
