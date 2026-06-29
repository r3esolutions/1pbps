import db from "@/src/lib/db";
import Link from "next/link";

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

  const [[resellerStats]]: any = await db.query(
    "SELECT COUNT(*) total FROM resellers"
  );

  const [[commissionStats]]: any = await db.query(
    "SELECT IFNULL(SUM(commission_amount),0) total FROM reseller_commissions WHERE status='pending'"
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

      <div className="grid gap-6 mt-8 md:grid-cols-3 lg:grid-cols-6">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Customers</div>
          <div className="mt-2 text-4xl font-bold">{customerStats.total}</div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Orders</div>
          <div className="mt-2 text-4xl font-bold">{orderStats.total}</div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Unpaid</div>
          <div className="mt-2 text-4xl font-bold text-yellow-400">
            {invoiceStats.total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Tickets</div>
          <div className="mt-2 text-4xl font-bold text-cyan-400">
            {ticketStats.total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Resellers</div>
          <div className="mt-2 text-4xl font-bold text-green-400">
            {resellerStats.total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Pending Commission</div>
          <div className="mt-2 text-3xl font-bold text-orange-400">
            ${Number(commissionStats.total).toFixed(2)}
          </div>
        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">

        <Link href="/admin/resellers" className="rounded-xl bg-cyan-600 p-4 text-center font-bold text-black">
          Resellers
        </Link>

        <Link href="/admin/commissions" className="rounded-xl bg-green-600 p-4 text-center font-bold text-black">
          Commissions
        </Link>

        <Link href="/admin/reports/commissions" className="rounded-xl bg-violet-600 p-4 text-center font-bold">
          Reports
        </Link>

        <Link href="/admin/reports/top-resellers" className="rounded-xl bg-orange-600 p-4 text-center font-bold text-black">
          Top Resellers
        </Link>

      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">

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
              <tr key={o.order_number} className="border-b border-white/5">
                <td className="p-4">{o.order_number}</td>
                <td className="p-4">${o.total}</td>
                <td className="p-4">{o.payment_status}</td>
                <td className="p-4">{String(o.created_at).slice(0,10)}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}
