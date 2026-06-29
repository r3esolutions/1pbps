export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";
import NewTicketForm from "@/src/components/tickets/NewTicketForm";

export default async function NewTicketPage() {

  const customer = await requireCustomer();

  const [orders]: any = await db.query(
    `
    SELECT
      id,
      order_number,
      server_plan,
      location
    FROM orders
    WHERE customer_id=?
    ORDER BY id DESC
    `,
    [customer.id]
  );

  return (
    <div className="max-w-5xl p-8 text-white">

      <h1 className="text-4xl font-bold">
        Create Support Ticket
      </h1>

      <NewTicketForm orders={orders} />

    </div>
  );
}
