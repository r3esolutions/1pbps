export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";
import { notFound } from "next/navigation";

export default async function InvoiceDetails({ params }: any) {
  const customer = await requireCustomer();

  const [rows]: any = await db.query(
    `
    SELECT *
    FROM invoices
    WHERE id=? AND customer_id=?
    LIMIT 1
    `,
    [params.id, customer.id]
  );

  if (!rows.length) {
    notFound();
  }

  const invoice = rows[0];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Invoice #{invoice.invoice_no}
      </h1>

      <div className="rounded-2xl border border-white/10 p-6 text-white space-y-4">
        <div><strong>Amount:</strong> ${invoice.total}</div>
        <div><strong>Status:</strong> {invoice.status}</div>
        <div><strong>Description:</strong> {invoice.description}</div>
        <div><strong>Created:</strong> {String(invoice.created_at)}</div>
      </div>
    </div>
  );
}
