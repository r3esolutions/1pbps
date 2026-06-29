export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function ActivityPage() {

  const [orders]: any = await db.query(`
    SELECT
      order_number,
      payment_status,
      service_status,
      updated_at
    FROM orders
    ORDER BY updated_at DESC
    LIMIT 20
  `);

  const [tickets]: any = await db.query(`
    SELECT
      ticket_number,
      subject,
      status,
      updated_at
    FROM tickets
    ORDER BY updated_at DESC
    LIMIT 20
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Activity Logs
      </h1>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <div className="rounded-3xl border border-white/10 overflow-hidden">

          <div className="border-b border-white/10 p-5 text-2xl font-bold">
            Recent Order Activity
          </div>

          <table className="w-full">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Service</th>
                <th className="p-4 text-left">Updated</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o:any)=>(
                <tr key={o.order_number} className="border-b border-white/5">
                  <td className="p-4">{o.order_number}</td>
                  <td className="p-4">{o.payment_status}</td>
                  <td className="p-4">{o.service_status}</td>
                  <td className="p-4">
                    {o.updated_at
                      ? String(o.updated_at).slice(0,16)
                      : "-"
                    }
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

        <div className="rounded-3xl border border-white/10 overflow-hidden">

          <div className="border-b border-white/10 p-5 text-2xl font-bold">
            Recent Ticket Activity
          </div>

          <table className="w-full">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-4 text-left">Ticket</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Updated</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((t:any)=>(
                <tr key={t.ticket_number} className="border-b border-white/5">
                  <td className="p-4">{t.ticket_number}</td>
                  <td className="p-4">{t.subject}</td>
                  <td className="p-4">{t.status}</td>
                  <td className="p-4">
                    {t.updated_at
                      ? String(t.updated_at).slice(0,16)
                      : "-"
                    }
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
