export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";

export default async function OrdersPage() {

  const customer = await requireCustomer();

  const [orders]: any = await db.query(
    `
    SELECT
      id,
      order_number,
      location,
      server_plan,
      total,
      status,
      created_at
    FROM orders
    WHERE customer_id = ?
    ORDER BY id DESC
    `,
    [customer.id]
  );

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white">
        My Orders
      </h1>

      <div className="mt-8 overflow-auto">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th>Order</th>
              <th>Location</th>
              <th>Plan</th>
              <th>Total</th>
              <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o:any)=>(
                <tr key={o.order_number}>
                  <td>{o.order_number}</td>
                  <td>{o.location}</td>
                  <td>{o.server_plan}</td>
                  <td>${o.total}</td>
                  <td><span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">{o.status}</span></td>
                  <td>
                    <a href={`/dashboard/orders/${o.id}`} className="rounded bg-cyan-500 px-3 py-1 text-black font-semibold">View</a>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
