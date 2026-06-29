export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";
import ReplyBox from "@/src/components/tickets/ReplyBox";
import { notFound } from "next/navigation";

export default async function Page(
  { params }: { params: Promise<{ id:string }> }
) {
  const customer = await requireCustomer();
  const { id } = await params;

  const [tickets]: any = await db.query(
    `
    SELECT *
    FROM tickets
    WHERE id=?
      AND customer_id=?
    LIMIT 1
    `,
    [id, customer.id]
  );

  if (!tickets.length) {
    notFound();
  }

  const ticket = tickets[0];

  const [replies]: any = await db.query(
    `
    SELECT *
    FROM ticket_replies
    WHERE ticket_id=?
    ORDER BY id ASC
    `,
    [id]
  );

  return (
    <div className="max-w-6xl mx-auto p-8 text-white">

      <a href="/dashboard/tickets" className="inline-block mb-6 rounded border border-white/10 px-4 py-2 hover:border-cyan-400">← Back to Tickets</a>

      <div className="rounded-2xl border border-white/10 p-6">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              {ticket.ticket_number}
            </h1>

            <div className="text-gray-400 mt-2">
              {ticket.subject}
            </div>
          </div>

          <div className="text-right">
            <div>Status: <span className={ticket.status === "Closed" ? "rounded-full bg-red-500/20 px-3 py-1 text-red-400" : "rounded-full bg-green-500/20 px-3 py-1 text-green-400"}>{ticket.status}</span></div>
            <div>Priority: <span className={ticket.priority === "High" ? "rounded-full bg-red-500/20 px-3 py-1 text-red-400" : ticket.priority === "Medium" ? "rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400" : "rounded-full bg-green-500/20 px-3 py-1 text-green-400"}>{ticket.priority}</span></div>
          </div>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex justify-end">
          <div className="max-w-3xl rounded-2xl bg-cyan-500 text-black p-5">
            <div className="font-bold mb-2">
              You
            </div>
            {ticket.message}
          </div>
        </div>

        {replies.map((r:any)=>(
          <div
            key={r.id}
            className={
              r.admin_reply
                ? "flex justify-start"
                : "flex justify-end"
            }
          >
            <div
              className={
                r.admin_reply
                  ? "max-w-3xl rounded-2xl border border-white/10 p-5 bg-[#111827]"
                  : "max-w-3xl rounded-2xl bg-cyan-500 text-black p-5"
              }
            >
              <div className="font-bold mb-2">
                {r.admin_reply
                  ? "Support Staff"
                  : "You"}
              </div>

              {r.message}
            </div>
          </div>
        ))}

      </div>

      <ReplyBox ticketId={ticket.id} />

    </div>
  );
}
