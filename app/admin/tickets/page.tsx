export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function AdminTicketsPage() {

  const [rows]: any = await db.query(
    `
    SELECT
      t.id,
      t.ticket_number,
      t.subject,
      t.priority,
      t.status,
      t.created_at,
      c.full_name,
      c.email
    FROM tickets t
    LEFT JOIN customers c
      ON c.id=t.customer_id
    ORDER BY t.id DESC
    `
  );

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold">
        Support Tickets
      </h1>

      <div className="mt-8 overflow-auto rounded-2xl border border-white/10">

        <table className="w-full text-white">

          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">Ticket</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((t:any)=>(
              <tr key={t.id} className="border-b border-white/5">

                <td className="p-4">{t.ticket_number}</td>

                <td className="p-4">
                  {t.full_name}
                  <div className="text-xs text-gray-400">
                    {t.email}
                  </div>
                </td>

                <td className="p-4">{t.subject}</td>

                <td className="p-4">{t.priority}</td>

                <td className="p-4">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
                    {t.status}
                  </span>
                </td>

                <td className="p-4">
                  <a
                    href={`/admin/tickets/${t.id}`}
                    className="rounded bg-cyan-500 px-3 py-2 text-black font-semibold"
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
