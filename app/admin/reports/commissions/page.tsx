import db from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function CommissionReportPage() {

  const [rows]: any = await db.query(`
    SELECT
      DATE_FORMAT(created_at,'%Y-%m') month,
      COUNT(*) total_commissions,
      SUM(commission_amount) total_amount,
      SUM(CASE WHEN status='paid' THEN commission_amount ELSE 0 END) paid_amount,
      SUM(CASE WHEN status='pending' THEN commission_amount ELSE 0 END) pending_amount
    FROM reseller_commissions
    GROUP BY DATE_FORMAT(created_at,'%Y-%m')
    ORDER BY month DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="mb-8 text-4xl font-bold">
        Monthly Commission Report
      </h1>

      <div className="overflow-auto rounded-2xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Month</th>
              <th className="p-4 text-right">Commissions</th>
              <th className="p-4 text-right">Total</th>
              <th className="p-4 text-right">Paid</th>
              <th className="p-4 text-right">Pending</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((r:any)=>(
              <tr
                key={r.month}
                className="border-t border-white/10"
              >
                <td className="p-4">{r.month}</td>
                <td className="p-4 text-right">{r.total_commissions}</td>
                <td className="p-4 text-right">
                  ${Number(r.total_amount).toFixed(2)}
                </td>
                <td className="p-4 text-right text-green-400">
                  ${Number(r.paid_amount).toFixed(2)}
                </td>
                <td className="p-4 text-right text-yellow-400">
                  ${Number(r.pending_amount).toFixed(2)}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
