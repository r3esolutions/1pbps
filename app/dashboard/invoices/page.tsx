export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { getAdmin } from "@/src/lib/auth";

export default async function InvoicesPage() {

  const customer = await getAdmin();

  const [rows]: any = await db.query(
    `
    SELECT
      id,
      invoice_no,
      total,
      status,
      due_date,
      created_at
    FROM invoices
    WHERE customer_id=?
    ORDER BY id DESC
    `,
    [customer.id]
  );

  const totalInvoices = rows.length;
  const paidInvoices = rows.filter((i:any)=>i.status==="paid").length;
  const unpaidInvoices = rows.filter((i:any)=>i.status==="unpaid").length;

  const totalAmount = rows.reduce(
    (sum:number,i:any)=>sum + Number(i.total || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-white">
        My Invoices
      </h1>

      <p className="text-gray-400 mt-2">
        View and manage all your invoices
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Total Invoices</div>
          <div className="text-4xl font-bold text-cyan-400 mt-2">
            {totalInvoices}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Paid</div>
          <div className="text-4xl font-bold text-green-400 mt-2">
            {paidInvoices}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Unpaid</div>
          <div className="text-4xl font-bold text-yellow-400 mt-2">
            {unpaidInvoices}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Total Amount</div>
          <div className="text-4xl font-bold text-purple-400 mt-2">
            ${totalAmount.toFixed(2)}
          </div>
        </div>

      </div>

      <div className="mt-8 overflow-auto rounded-2xl border border-white/10">

        <table className="w-full text-white">

          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">Invoice #</th>
              <th className="p-4 text-left">Invoice Date</th>
              <th className="p-4 text-left">Due Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((i:any)=>(
              <tr
                key={i.id}
                className="border-b border-white/5"
              >
                <td className="p-4 font-bold text-cyan-400">
                  {i.invoice_no}
                </td>

                <td className="p-4">
                  {String(i.created_at).slice(0,10)}
                </td>

                <td className="p-4">
                  {String(i.due_date).slice(0,10)}
                </td>

                <td className="p-4">
                  ${i.total}
                </td>

                <td className="p-4">

                  <span
                    className={
                      i.status === "paid"
                        ? "rounded-full bg-green-500/20 px-3 py-1 text-green-400"
                        : "rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400"
                    }
                  >
                    {i.status}
                  </span>

                </td>

                <td className="p-4 space-x-2">

                  <a
                    href={`/dashboard/invoices/${i.id}`}
                    className="inline-block rounded bg-cyan-500 px-3 py-2 text-black font-semibold"
                  >
                    View
                  </a>

                  <a
                    href={`/api/invoices/pdf/${i.id}`}
                    className="rounded border border-white/20 px-3 py-2"
                  >
                    PDF
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
