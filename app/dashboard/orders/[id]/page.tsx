export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";
import { notFound } from "next/navigation";

export default async function OrderDetails({ params }: any) {
  const customer = await requireCustomer();

  const [rows]: any = await db.query(
    `
    SELECT *
    FROM orders
    WHERE id=? AND customer_id=?
    LIMIT 1
    `,
    [params.id, customer.id]
  );

  if (!rows.length) {
    notFound();
  }

  const order = rows[0];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Order #{order.order_number}
      </h1>

      <div className="rounded-2xl border border-white/10 p-6 text-white space-y-4">
        <div><strong>Location:</strong> {order.location}</div>
        <div><strong>Server Plan:</strong> {order.server_plan}</div>
        <div><strong>Total:</strong> ${order.total}</div>
        <div><strong>Status:</strong> {order.status}</div>
        <div><strong>Payment Status:</strong> {order.payment_status}</div>
        <div><strong>Created:</strong> {String(order.created_at)}</div>
      </div>
    </div>
  );
}
