export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function SystemPage() {

  const [[customers]]: any = await db.query(
    "SELECT COUNT(*) total FROM customers"
  );

  const [[orders]]: any = await db.query(
    "SELECT COUNT(*) total FROM orders"
  );

  const [[invoices]]: any = await db.query(
    "SELECT COUNT(*) total FROM invoices"
  );

  const [[tickets]]: any = await db.query(
    "SELECT COUNT(*) total FROM tickets"
  );

  const [[wallet]]: any = await db.query(
    "SELECT IFNULL(SUM(wallet_balance),0) total FROM customers"
  );

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        System Information
      </h1>

      <div className="grid md:grid-cols-5 gap-6 mt-8">

        <div className="rounded-3xl border border-white/10 p-6">
          <div className="text-gray-400">Customers</div>
          <div className="mt-2 text-4xl font-bold text-cyan-400">
            {customers.total}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 p-6">
          <div className="text-gray-400">Orders</div>
          <div className="mt-2 text-4xl font-bold text-green-400">
            {orders.total}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 p-6">
          <div className="text-gray-400">Invoices</div>
          <div className="mt-2 text-4xl font-bold text-yellow-400">
            {invoices.total}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 p-6">
          <div className="text-gray-400">Tickets</div>
          <div className="mt-2 text-4xl font-bold text-purple-400">
            {tickets.total}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 p-6">
          <div className="text-gray-400">Wallet Balance</div>
          <div className="mt-2 text-4xl font-bold text-emerald-400">
            ${Number(wallet.total).toFixed(2)}
          </div>
        </div>

      </div>

      <div className="mt-10 rounded-3xl border border-white/10 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Environment
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Framework</span>
            <span>Next.js 16</span>
          </div>

          <div className="flex justify-between">
            <span>Runtime</span>
            <span>Node.js</span>
          </div>

          <div className="flex justify-between">
            <span>Database</span>
            <span>MariaDB / MySQL</span>
          </div>

          <div className="flex justify-between">
            <span>Application</span>
            <span>1PBPS Client Portal</span>
          </div>

        </div>

      </div>

    </div>
  );
}
