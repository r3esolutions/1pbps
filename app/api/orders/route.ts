import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const customer = await requireCustomer();
    const body = await req.json();

    const [lastOrder]: any = await db.query(
      "SELECT id FROM orders ORDER BY id DESC LIMIT 1"
    );

    const orderNumber =
      "ORD-" +
      String(((lastOrder?.[0]?.id || 0) + 1)).padStart(6, "0");

    const [order]: any = await db.query(
      `INSERT INTO orders
      (
        customer_id,
        order_number,
        location,
        server_plan,
        ram,
        storage,
        operating_system,
        ipv4_qty,
        bandwidth,
        billing_term,
        payment_method,
        subtotal,
        discount,
        total
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer.id,
        orderNumber,
        body.location,
        body.server_plan,
        body.ram,
        body.storage,
        body.operating_system,
        body.ipv4_qty,
        body.bandwidth,
        body.billing_term,
        body.payment_method,
        body.subtotal,
        body.discount,
        body.total
      ]
    );

    return NextResponse.json({
      success: true,
      order_id: order.insertId,
      order_number: orderNumber
    });

  } catch (error:any) {
    return NextResponse.json({
      success:false,
      error:error.message
    });
  }
}
