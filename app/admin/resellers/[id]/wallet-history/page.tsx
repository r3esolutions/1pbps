import db from "@/src/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WalletHistory({ params }: any) {

  const { id } = await params;

  const [reseller]: any = await db.query(
    "SELECT company_name FROM resellers WHERE id=? LIMIT 1",
    [id]
  );

  if (!reseller.length) notFound();

  const [rows]: any = await db.query(
    `
    SELECT *
    FROM reseller_wallet_transactions
    WHERE reseller_id=?
    ORDER BY id DESC
    `,
    [id]
  );

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Wallet History - {reseller[0].company_name}
        </h1>

        <Link
          href={`/admin/resellers/${id}`}
          className="rounded bg-zinc-800 px-4 py-2"
        >
          Back
        </Link>
      </div>

      <div className="overflow-auto rounded-2xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-right">Balance</th>
              <th className="p-4 text-left">Description</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((r:any)=>(
              <tr
                key={r.id}
                className="border-t border-white/10"
              >
                <td className="p-4">
                  {String(r.created_at).slice(0,19)}
                </td>

                <td className="p-4">
                  {r.type}
                </td>

                <td className="p-4 text-right">
                  ${Number(r.amount).toFixed(2)}
                </td>

                <td className="p-4 text-right">
                  ${Number(r.balance_after).toFixed(2)}
                </td>

                <td className="p-4">
                  {r.description}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
