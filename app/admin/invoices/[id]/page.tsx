import db from "@/src/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import PrintButton from "@/src/components/admin/PrintButton";

export default async function AdminInvoiceDetails({ params }: any) {
  const { id } = await params;

  console.log("Invoice ID:", id);
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
    [id]
  );

  console.log("Rows:", rows);
  if (!rows.length) {
    notFound();
  }

  const invoice = rows[0];

  return (
    <div className="mx-auto max-w-5xl bg-white text-black p-10">

      <div className="flex items-start justify-between border-b pb-6">

        <div>
          <h1 className="text-4xl font-bold text-cyan-700">
            1PBPS
          </h1>

          <p className="mt-2 text-gray-600">
            Dedicated Servers • VPS • Colocation
          </p>

          <p>support@1pbps.com</p>
          <p>https://1pbps.com</p>

        </div>

        <div className="text-right">

          <h2 className="text-3xl font-bold">
            TAX INVOICE
          </h2>

          <div className="mt-4 text-sm">

            <p>
              <strong>Invoice:</strong> {invoice.invoice_no}<br/><strong>Status:</strong> <span className="rounded bg-green-600 px-2 py-1 text-white">{String(invoice.status).toUpperCase()}</span>
            </p>

            <p>
              <strong>Order:</strong> {invoice.order_number}
            </p>

            <p>
              <strong>Due:</strong>{" "}
              {invoice.due_date
                ? String(invoice.due_date).slice(0,10)
                : "-"}
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 flex justify-end gap-3 print:hidden">

        <Link
          href="/admin/invoices"
          className="rounded bg-zinc-800 px-4 py-2 text-white"
        >
          Back
        </Link>

        <PrintButton />

      </div>

      <div className="mt-10 grid grid-cols-2 gap-8">

        <div>

          <h3 className="mb-3 text-lg font-bold">
            Bill To
          </h3>

          <p className="font-semibold">
            {invoice.full_name}
          </p>

          <p>{invoice.email}</p>

          <p className="mt-3">
            <strong>GST:</strong> {invoice.gst_number || "-"}
          </p>

          <div className="mt-3 whitespace-pre-wrap">
            {invoice.billing_address || "-"}
          </div>

        </div>

        <div className="rounded-xl border p-5">

          <div className="flex justify-between">
            <span>Status</span>

            <span className="rounded bg-green-600 px-3 py-1 text-white">
              {invoice.status}
            </span>

          </div>

          <div className="mt-4 flex justify-between">
            <span>Subtotal</span>
            <strong>${Number(invoice.subtotal).toFixed(2)}</strong>
          </div>

          <div className="mt-2 flex justify-between">
            <span>GST</span>
            <strong>${Number(invoice.gst_amount).toFixed(2)}</strong>
          </div>
          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${Number(invoice.total).toFixed(2)}</span>
          </div>

        </div>

      </div>

      <div className="mt-10">

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-center">Qty</th>
              <th className="border p-3 text-right">Unit Price</th>
              <th className="border p-3 text-right">Total</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td className="border p-3">
                Dedicated Server Order #{invoice.order_number}
              </td>

              <td className="border p-3 text-center">
                1
              </td>

              <td className="border p-3 text-right">
                ${Number(invoice.subtotal).toFixed(2)}
              </td>

              <td className="border p-3 text-right">
                ${Number(invoice.subtotal).toFixed(2)}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      <div className="mt-12 border-t pt-6 text-center text-sm text-gray-600">
        <p>Thank you for choosing <strong>1PBPS</strong>.</p>
        <p>This is a system generated invoice and does not require a signature.</p>
      </div>

    </div>
  );
}

{/* Footer */}
<div className="mt-12 border-t pt-8 text-sm text-gray-600">
  <div className="flex justify-between">
    <div>
      <p><strong>Terms:</strong></p>
      <p>Payment received in full.</p>
      <p>Thank you for choosing 1PBPS.</p>
    </div>

    <div className="text-right">
      <p className="mb-10">Authorized Signatory</p>
      <strong>1PBPS</strong>
    </div>
  </div>
</div>
