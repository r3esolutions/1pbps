import db from "@/src/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TopResellersPage() {

  const [rows]: any = await db.query(`
    SELECT
      r.id,
      r.company_name,
      r.full_name,
      r.credit,
      COUNT(DISTINCT rc.customer_id) clients,
      COUNT(DISTINCT cm.id) commissions,
      IFNULL(SUM(cm.commission_amount),0) earnings
    FROM resellers r
    LEFT JOIN reseller_clients rc
      ON rc.reseller_id=r.id
    LEFT JOIN reseller_commissions cm
      ON cm.reseller_id=r.id
    GROUP BY r.id
    ORDER BY earnings DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Top Resellers
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
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Owner</th>
              <th className="p-4 text-center">Clients</th>
              <th className="p-4 text-center">Commissions</th>
              <th className="p-4 text-right">Wallet</th>
              <th className="p-4 text-right">Earnings</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((r:any)=>(
              <tr
                key={r.id}
                className="border-t border-white/10"
              >
                <td className="p-4">{r.company_name}</td>

                <td className="p-4">{r.full_name}</td>

                <td className="p-4 text-center">{r.clients}</td>

                <td className="p-4 text-center">{r.commissions}</td>

                <td className="p-4 text-right">
                  ${Number(r.credit).toFixed(2)}
                </td>

                <td className="p-4 text-right font-bold text-green-400">
                  ${Number(r.earnings).toFixed(2)}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
