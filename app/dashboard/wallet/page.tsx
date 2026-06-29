export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";

export default async function WalletPage() {

  const customer = await requireCustomer();

  const [rows]: any = await db.query(
    `
    SELECT
      type,
      amount,
      description,
      created_at
    FROM wallet_transactions
    WHERE customer_id=?
    ORDER BY id DESC
    `,
    [customer.id]
  );

  const balance = Number(customer.wallet_balance || 0);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Wallet
      </h1>

      <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900/50 p-8">

        <div className="text-gray-400">
          Current Balance
        </div>

        <div className="mt-2 text-5xl font-bold text-cyan-400">
          ${balance.toFixed(2)}
        </div>

      </div>

      <div className="mt-8 rounded-3xl border border-white/10 overflow-hidden">

        <table className="w-full text-white">

          <thead className="border-b border-white/10 bg-zinc-900">

            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Description</th>
            </tr>

          </thead>

          <tbody>

            {rows.map((w:any,index:number)=>(
              <tr
                key={index}
                className="border-b border-white/5"
              >
                <td className="p-4">
                  {String(w.created_at).slice(0,10)}
                </td>

                <td className="p-4">
                  {w.type}
                </td>

                <td className={
                  "p-4 font-bold " +
                  (
                    Number(w.amount) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  )
                }>
                  ${Number(w.amount).toFixed(2)}
                </td>

                <td className="p-4">
                  {w.description}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
