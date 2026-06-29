import db from "@/src/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import PrintButton from "@/src/components/admin/PrintButton";

export default async function AdminInvoiceDetails({ params }: any) {

  const [rows]: any = await db.query(
    `
    SELECT
      i.*,
      c.full_name,
      c.email,
      o.order_number
    FROM invoices i
    LEFT JOIN customers c
      ON c.id=i.customer_id
    LEFT JOIN orders o
      ON o.id=i.order_id
    WHERE i.id=?
    LIMIT 1
    `,
    [params.id]
  );

  if (!rows.length) {
    notFound();
  }

  const invoice = rows[0];

  return (
    <div className="max-w-6xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          {invoice.invoice_no}
        </h1>

        <Link
          href="/admin/invoices"
          className="rounded bg-zinc-800 px-4 py-2"

        >
          Back
        </Link>

        <PrintButton />

      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">

        <div className="rounded-2xl border border-white/10 p-6">

          <h2 className="mb-4 text-xl font-bold">
            Customer
          </h2>

          <p>{invoice.full_name}</p>
          <p>{invoice.email}</p>

          <div className="mt-4">
            <strong>GST:</strong> {invoice.gst_number || "-"}
          </div>

          <div className="mt-2 whitespace-pre-wrap">
            {invoice.billing_address || "-"}
          </div>

        </div>

        <div className="rounded-2xl border border-white/10 p-6">

          <h2 className="mb-4 text-xl font-bold">
            Invoice
          </h2>

          <p><strong>Order:</strong> {invoice.order_number}</p>
          <p><strong>Status:</strong> {invoice.status}</p>
          <p><strong>Subtotal:</strong> ${invoice.subtotal}</p>
          <p><strong>GST:</strong> ${invoice.gst_amount}</p>
          <p><strong>Total:</strong> ${invoice.total}</p>
          <p><strong>Due:</strong> {String(invoice.due_date).slice(0,10)}</p>

        </div>

      </div>

    </div>
  );

}
