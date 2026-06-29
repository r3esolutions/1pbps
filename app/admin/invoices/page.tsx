import db from "@/src/lib/db";

export default async function InvoicesPage() {

  const [invoices]: any = await db.query(`
    SELECT
      i.id,
      i.invoice_no,
      i.total,
      i.status,
      i.due_date,
      c.full_name,
      c.email
    FROM invoices i
    LEFT JOIN customers c
      ON c.id=i.customer_id
    ORDER BY i.id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Invoices
      </h1>

      <div className="mt-8 overflow-auto rounded-3xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900 border-b border-white/10">
            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Due Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {invoices.map((i:any)=>(
              <tr
                key={i.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-4 font-bold text-cyan-400">
                  {i.invoice_no}
                </td>

                <td className="p-4">
                  {i.full_name}
                </td>

                <td className="p-4">
                  {i.email}
                </td>

                <td className="p-4">
                  {i.due_date
                    ? String(i.due_date).slice(0,10)
                    : "-"
                  }
                </td>

                <td className="p-4">
                  ${Number(i.total).toFixed(2)}
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

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
