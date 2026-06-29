export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { redirect } from "next/navigation";
import { requireCustomer } from "@/src/lib/auth";

export default async function Dashboard() {

  const customer = await requireCustomer();
  if (!customer) {
    redirect("/login");
  }


  const [services]: any = await db.query(
    "SELECT COUNT(*) total FROM orders WHERE customer_id=?",
    [customer.id]
  );

  const [invoices]: any = await db.query(
    "SELECT COUNT(*) total FROM invoices WHERE customer_id=?",
    [customer.id]
  );

  const [pending]: any = await db.query(
    "SELECT COUNT(*) total FROM orders WHERE customer_id=? AND payment_status IN ('Pending','Awaiting Verification')",
    [customer.id]
  );

  const [spent]: any = await db.query(
    `
    SELECT COALESCE(SUM(total),0) total
    FROM invoices
    WHERE customer_id=?
    AND status='paid'
    `,
    [customer.id]
  );

  const [wallet]: any = await db.query(
    "SELECT wallet_balance,total_spent FROM customers WHERE id=? LIMIT 1",
    [customer.id]
  );

  const [recentOrders]: any = await db.query(
    `
    SELECT
      order_number,
      location,
      server_plan,
      total,
      status
    FROM orders
    WHERE customer_id=?
    ORDER BY id DESC
    LIMIT 5
    `,
    [customer.id]
  );

  const [recentInvoices]: any = await db.query(
    `
    SELECT invoice_no,total,status
    FROM invoices
    WHERE customer_id=?
    ORDER BY id DESC
    LIMIT 5
    `,
    [customer.id]
  );


  const [recentTickets]: any = await db.query(
    `
    SELECT ticket_number,subject,status
    FROM tickets
    WHERE customer_id=?
    ORDER BY id DESC
    LIMIT 5
    `,
    [customer.id]
  );


  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-white">
        Client Area
      </h1>

      <div className="grid md:grid-cols-5 gap-6 mt-8">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Services</div>
          <div className="text-4xl font-bold text-cyan-400">
            {services[0].total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Invoices</div>
          <div className="text-4xl font-bold text-green-400">
            {invoices[0].total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Pending Orders</div>
          <div className="text-4xl font-bold text-yellow-400">
            {pending[0].total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Wallet</div>
          <div className="text-4xl font-bold text-purple-400">
            ${wallet[0]?.wallet_balance || 0}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Total Spent</div>
          <div className="text-4xl font-bold text-red-400">
            ${spent[0]?.total || 0}
          </div>
        </div>

      </div>

      <div className="mt-10 rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Orders</h2>

        <div className="overflow-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-2">Order</th>
                <th className="text-left p-2">Location</th>
                <th className="text-left p-2">Plan</th>
                <th className="text-left p-2">Total</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o:any)=>(
                <tr key={o.order_number} className="border-b border-white/5">
                  <td className="p-2">{o.order_number}</td>
                  <td className="p-2">{o.location}</td>
                  <td className="p-2">{o.server_plan}</td>
                  <td className="p-2">${o.total}</td>
                  <td className="p-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Invoices</h2>

        <div className="overflow-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-2">Invoice</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((i:any)=>(
                <tr key={i.invoice_no} className="border-b border-white/5">
                  <td className="p-2">{i.invoice_no}</td>
                  <td className="p-2">${i.total}</td>
                  <td className="p-2">{i.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recent Tickets</h2>
          <a href="/dashboard/tickets/new" className="rounded bg-cyan-500 px-4 py-2 text-black font-semibold">
            Open Ticket
          </a>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-2">Ticket</th>
                <th className="text-left p-2">Subject</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((t:any)=>(
                <tr key={t.ticket_number} className="border-b border-white/5">
                  <td className="p-2">{t.ticket_number}</td>
                  <td className="p-2">{t.subject}</td>
                  <td className="p-2">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <a href="/dashboard/services" className="rounded-xl border border-white/10 p-5 text-center text-white">
          My Services
        </a>
        <a href="/dashboard/tickets/new" className="rounded-xl border border-white/10 p-5 text-center text-white">
          Open Ticket
        </a>
        <a href="/dashboard/wallet" className="rounded-xl border border-white/10 p-5 text-center text-white">
          Add Funds
        </a>
      </div>

    </div>
  );
}
