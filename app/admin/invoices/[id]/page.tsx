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
    <div className="mx-auto max-w-6xl p-8 text-white">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Invoice</h1>
          <p className="mt-2 text-cyan-400 text-xl">
            {invoice.invoice_no}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/invoices"
            className="rounded bg-zinc-800 px-4 py-2"
          >
            Back
          </Link>

          <PrintButton />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Customer Details</h2>

          <p><strong>Name:</strong> {invoice.full_name}</p>
          <p><strong>Email:</strong> {invoice.email}</p>
          <p><strong>GST:</strong> {invoice.gst_number || "-"}</p>

          <div className="mt-4">
            <strong>Billing Address</strong>
            <div className="mt-2 whitespace-pre-wrap text-gray-300">
              {invoice.billing_address || "-"}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Invoice Summary</h2>

          <div className="space-y-3">
            <p><strong>Order No:</strong> {invoice.order_number}</p>
            <p><strong>Status:</strong> {invoice.status}</p>
            <p><strong>Subtotal:</strong> ${Number(invoice.subtotal).toFixed(2)}</p>
            <p><strong>GST:</strong> ${Number(invoice.gst_amount).toFixed(2)}</p>

            <hr className="border-white/10" />

            <p className="text-xl font-bold text-cyan-400">
              Total: ${Number(invoice.total).toFixed(2)}
            </p>

            <p>
              <strong>Due Date:</strong>{" "}
              {invoice.due_date
                ? String(invoice.due_date).slice(0,10)
                : "-"}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {invoice.created_at
                ? String(invoice.created_at).slice(0,19)
                : "-"}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
