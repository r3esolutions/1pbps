import db from "@/src/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ResellersPage() {

  const [rows]: any = await db.query(`
    SELECT
      r.*,
      c.full_name,
      c.email
    FROM resellers r
    LEFT JOIN customers c
      ON c.id=r.customer_id
    ORDER BY r.id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Resellers
        </h1>

        <Link
          href="/admin/resellers/new"
          className="rounded bg-cyan-600 px-4 py-2 font-semibold text-black"
        >
          Add Reseller
        </Link>
      </div>

      <div className="overflow-auto rounded-2xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Owner</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-right">Credit</th>
              <th className="p-4 text-center">Discount</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r:any)=>(
              <tr key={r.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-4">{r.company_name}</td>
                <td className="p-4">{r.full_name}</td>
                <td className="p-4">{r.email}</td>
                <td className="p-4 text-right">${Number(r.credit).toFixed(2)}</td>
                <td className="p-4 text-center">{r.discount_percent}%</td>
                <td className="p-4 text-center">{r.status}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}
