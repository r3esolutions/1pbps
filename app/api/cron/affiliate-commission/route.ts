import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  try {

    const [orders]: any = await db.query(`
      SELECT
        o.id,
        o.customer_id,
        o.total,
        r.customer_id AS referrer_id,
        r.commission_percent
      FROM orders o
      INNER JOIN referrals r
        ON r.customer_id=o.customer_id
      WHERE
        o.payment_status='Paid'
        AND NOT EXISTS (
          SELECT 1
          FROM affiliate_commissions ac
          WHERE ac.order_id=o.id
        )
    `);

    let created = 0;

    for (const order of orders) {

      const commission =
        Number(order.total) *
        Number(order.commission_percent) / 100;

      await db.query(
        `
        INSERT INTO affiliate_commissions
        (
          referrer_customer_id,
          referred_customer_id,
          order_id,
          commission_amount,
          status
        )
        VALUES
        (
          ?,?,?,?,'pending'
        )
        `,
        [
          order.referrer_id,
          order.customer_id,
          order.id,
          commission
        ]
      );

      created++;
    }

    return NextResponse.json({
      success: true,
      created
    });

  } catch (err:any) {

    return NextResponse.json({
      success: false,
      error: err.message
    });

  }
}
