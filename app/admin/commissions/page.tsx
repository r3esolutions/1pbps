import db from "@/src/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CommissionsPage() {

  const [rows]: any = await db.query(`
    SELECT
      rc.*,
      r.company_name,
      c.full_name,
      i.invoice_no
    FROM reseller_commissions rc
    LEFT JOIN resellers r
      ON r.id=rc.reseller_id
    LEFT JOIN customers c
      ON c.id=rc.customer_id
    LEFT JOIN invoices i
      ON i.id=rc.invoice_id
    ORDER BY rc.id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Reseller Commissions
        </h1>

        <Link
          href="/admin"
          className="rounded bg-zinc-800 px-4 py-2"
        >
          Back
        </Link>
      </div>

      <div className="overflow-auto rounded-2xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Reseller</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-right">Commission</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((r:any)=>(
              <tr
                key={r.id}
                className="border-t border-white/10"
              >

                <td className="p-4">{r.invoice_no}</td>

                <td className="p-4">{r.full_name}</td>

                <td className="p-4">{r.company_name}</td>

                <td className="p-4 text-right">
                  ${Number(r.invoice_total).toFixed(2)}
                </td>

                <td className="p-4 text-right">
                  ${Number(r.commission_amount).toFixed(2)}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={
                      r.status === "paid"
                        ? "rounded-full bg-green-500/20 px-3 py-1 text-green-400"
                        : "rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400"
                    }
                  >
                    {r.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  {r.status === "pending" ? (
                    <form
                      action={`/api/admin/commissions/${r.id}/approve`}
                      method="post"
                    >
                      <button
                        className="rounded bg-cyan-600 px-3 py-2 font-semibold text-black hover:bg-cyan-500"
                      >
                        Approve
                      </button>
                    </form>
                  ) : (
                    <span className="text-green-400 font-semibold">
                      Completed
                    </span>
                  )}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
