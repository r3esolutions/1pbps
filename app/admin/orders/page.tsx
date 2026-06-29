import db from "@/src/lib/db";

export default async function OrdersPage() {

  const [orders]: any = await db.query(`
    SELECT
      o.id,
      o.order_number,
      o.location,
      o.server_plan,
      o.total,
      o.payment_status,
      o.service_status,
      o.hostname,
      o.primary_ip,
      o.next_due_date,
      c.full_name,
      c.email
    FROM orders o
    LEFT JOIN customers c
      ON c.id=o.customer_id
    ORDER BY o.id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Orders Management
      </h1>

      <div className="mt-8 overflow-auto rounded-3xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900 border-b border-white/10">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Server</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">IP</th>
              <th className="p-4 text-left">Due</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((o:any)=>(
              <tr
                key={o.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-4 font-bold text-cyan-400">
                  {o.order_number}
                </td>

                <td className="p-4">
                  <div>{o.full_name}</div>
                  <div className="text-xs text-gray-400">
                    {o.email}
                  </div>
                </td>

                <td className="p-4">
                  {o.server_plan}
                  <div className="text-xs text-gray-400">
                    {o.hostname || "-"}
                  </div>
                </td>

                <td className="p-4">
                  {o.location}
                </td>

                <td className="p-4">
                  ${Number(o.total).toFixed(2)}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
                    {o.payment_status}
                  </span>
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
                    {o.service_status || "Pending"}
                  </span>
                </td>

                <td className="p-4">
                  {o.primary_ip || "-"}
                </td>

                <td className="p-4">
                  {o.next_due_date
                    ? String(o.next_due_date).slice(0,10)
                    : "-"
                  }
                </td>

                <td className="p-4">
                  <a
                    href={`/admin/orders/${o.id}`}
                    className="rounded bg-cyan-500 px-3 py-2 font-semibold text-black"
                  >
                    Manage
                  </a>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
