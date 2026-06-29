import db from "@/src/lib/db";
import { notFound } from "next/navigation";

export default async function Page(
  { params }: { params: Promise<{ id:string }> }
) {

  const { id } = await params;

  const [customers]: any = await db.query(
    "SELECT * FROM customers WHERE id=? LIMIT 1",
    [id]
  );

  if (!customers.length) notFound();

  const customer = customers[0];

  const [orders]: any = await db.query(
    "SELECT id,order_number,total,status FROM orders WHERE customer_id=? ORDER BY id DESC LIMIT 10",
    [id]
  );

  const [invoices]: any = await db.query(
    "SELECT id,invoice_no,total,status FROM invoices WHERE customer_id=? ORDER BY id DESC LIMIT 10",
    [id]
  );

  const [tickets]: any = await db.query(
    "SELECT id,ticket_number,subject,status FROM tickets WHERE customer_id=? ORDER BY id DESC LIMIT 10",
    [id]
  );

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        {customer.first_name} {customer.last_name}
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Email</div>
          <div className="mt-2">{customer.email}</div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Country</div>
          <div className="mt-2">{customer.country}</div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Status</div>
          <div className="mt-2">{customer.status}</div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Wallet</div>
          <div className="mt-2 text-cyan-400">
            ${Number(customer.wallet_balance || 0).toFixed(2)}
          </div>
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

        {orders.map((o:any)=>(
          <div key={o.id} className="flex justify-between border-b border-white/10 py-2">
            <span>{o.order_number}</span>
            <span>${o.total}</span>
            <span>{o.status}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Invoices</h2>

        {invoices.map((i:any)=>(
          <div key={i.id} className="flex justify-between border-b border-white/10 py-2">
            <span>{i.invoice_no}</span>
            <span>${i.total}</span>
            <span>{i.status}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Tickets</h2>

        {tickets.map((t:any)=>(
          <div key={t.id} className="flex justify-between border-b border-white/10 py-2">
            <span>{t.ticket_number}</span>
            <span>{t.subject}</span>
            <span>{t.status}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
