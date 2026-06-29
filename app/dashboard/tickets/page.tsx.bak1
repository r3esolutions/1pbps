export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";

export default async function TicketsPage() {

  const customer = await requireCustomer();

  const [rows]: any = await db.query(
    `
    SELECT
      id,
      ticket_number,
      subject,
      priority,
      status,
      created_at
    FROM tickets
    WHERE customer_id=?
    ORDER BY id DESC
    `,
    [customer.id]
  );

  const openTickets =
    rows.filter((t:any)=>t.status !== "Closed").length;

  const closedTickets =
    rows.filter((t:any)=>t.status === "Closed").length;

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Support Tickets
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your support requests
          </p>
        </div>

        <a
          href="/dashboard/tickets/new"
          className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black"
        >
          + New Ticket
        </a>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Total Tickets</div>
          <div className="text-4xl font-bold text-cyan-400 mt-2">
            {rows.length}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Open</div>
          <div className="text-4xl font-bold text-green-400 mt-2">
            {openTickets}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Closed</div>
          <div className="text-4xl font-bold text-red-400 mt-2">
            {closedTickets}
          </div>
        </div>

      </div>

      <div className="mt-8 overflow-auto rounded-2xl border border-white/10">

        <table className="w-full text-white">

          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">Ticket</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((t:any)=>(
              <tr
                key={t.id}
                className="border-b border-white/5"
              >
                <td className="p-4 font-bold text-cyan-400">
                  {t.ticket_number}
                </td>

                <td className="p-4">
                  {t.subject}
                </td>

                <td className="p-4">
                  {t.priority}
                </td>

                <td className="p-4">
                  {t.status}
                </td>

                <td className="p-4">
                  {String(t.created_at).slice(0,10)}
                </td>

                <td className="p-4">
                  <a
                    href={`/dashboard/tickets/${t.id}`}
                    className="rounded bg-cyan-500 px-3 py-2 text-black font-semibold"
                  >
                    View
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
