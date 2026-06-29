import db from "@/src/lib/db";

export default async function TransactionsPage() {

  const [rows]: any = await db.query(`
    SELECT
      t.id,
      t.transaction_id,
      t.gateway,
      t.txid,
      t.amount,
      t.currency,
      t.type,
      t.status,
      t.created_at,
      c.full_name,
      o.order_number,
      i.invoice_no
    FROM transactions t
    LEFT JOIN customers c
      ON c.id=t.customer_id
    LEFT JOIN orders o
      ON o.id=t.order_id
    LEFT JOIN invoices i
      ON i.id=t.invoice_id
    ORDER BY t.id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Transactions
      </h1>

      <div className="mt-8 overflow-auto rounded-3xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900 border-b border-white/10">
            <tr>
              <th className="p-4 text-left">Transaction</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Gateway</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((t:any)=>(
              <tr
                key={t.id}
                className="border-b border-white/5 hover:bg-white/5"
              >

                <td className="p-4">
                  <div className="font-bold text-cyan-400">
                    {t.transaction_id || "-"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {t.txid || "-"}
                  </div>
                </td>

                <td className="p-4">
                  {t.full_name}
                </td>

                <td className="p-4">
                  {t.order_number || "-"}
                </td>

                <td className="p-4">
                  {t.invoice_no || "-"}
                </td>

                <td className="p-4">
                  {t.gateway}
                </td>

                <td className="p-4">
                  {t.currency} {Number(t.amount).toFixed(2)}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
                    {t.status}
                  </span>
                </td>

                <td className="p-4">
                  {String(t.created_at).slice(0,19)}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );

}
