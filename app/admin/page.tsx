import db from "@/src/lib/db";

export default async function AdminDashboard() {

  const [[customerStats]]: any = await db.query(
    "SELECT COUNT(*) total FROM customers"
  );

  const [[orderStats]]: any = await db.query(
    "SELECT COUNT(*) total FROM orders"
  );

  const [[invoiceStats]]: any = await db.query(
    "SELECT COUNT(*) total FROM invoices WHERE status='unpaid'"
  );

  const [[ticketStats]]: any = await db.query(
    "SELECT COUNT(*) total FROM tickets WHERE status<>'Closed'"
  );

  const [recentOrders]: any = await db.query(`
    SELECT
      order_number,
      total,
      payment_status,
      created_at
    FROM orders
    ORDER BY id DESC
    LIMIT 5
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Customers</div>
          <div className="text-4xl font-bold mt-2">
            {customerStats.total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Orders</div>
          <div className="text-4xl font-bold mt-2">
            {orderStats.total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Unpaid Invoices</div>
          <div className="text-4xl font-bold text-yellow-400 mt-2">
            {invoiceStats.total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Open Tickets</div>
          <div className="text-4xl font-bold text-cyan-400 mt-2">
            {ticketStats.total}
          </div>
        </div>

      </div>

      <div className="mt-10 rounded-2xl border border-white/10 overflow-hidden">

        <div className="border-b border-white/10 px-6 py-4 font-bold">
          Recent Orders
        </div>

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>

            {recentOrders.map((o:any)=>(
              <tr
                key={o.order_number}
                className="border-b border-white/5"
              >
                <td className="p-4">{o.order_number}</td>
                <td className="p-4">${o.total}</td>
                <td className="p-4">{o.payment_status}</td>
                <td className="p-4">
                  {String(o.created_at).slice(0,10)}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
