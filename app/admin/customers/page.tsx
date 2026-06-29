import db from "@/src/lib/db";

export default async function CustomersPage() {

  const [customers]: any = await db.query(`
    SELECT
      id,
      first_name,
      last_name,
      email,
      country,
      status,
      wallet_balance,
      created_at
    FROM customers
    ORDER BY id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Customers
      </h1>

      <div className="mt-8 overflow-auto rounded-3xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900 border-b border-white/10">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Wallet</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {customers.map((c:any)=>(
              <tr
                key={c.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-4">{c.id}</td>

                <td className="p-4 font-semibold">
                  {c.first_name} {c.last_name}
                </td>

                <td className="p-4">{c.email}</td>

                <td className="p-4">{c.country}</td>

                <td className="p-4 text-cyan-400">
                  ${Number(c.wallet_balance || 0).toFixed(2)}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
                    {c.status}
                  </span>
                </td>

                <td className="p-4">
                  <a
                    href={`/admin/customers/${c.id}`}
                    className="rounded bg-cyan-500 px-3 py-2 text-black font-semibold"
                  >
                    View
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
