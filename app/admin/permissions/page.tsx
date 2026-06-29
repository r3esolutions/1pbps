export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function PermissionsPage() {

  const [rows]: any = await db.query(`
    SELECT
      p.*,
      a.id AS admin_id,
      a.full_name
    FROM admin_permissions p
    LEFT JOIN admin_users a
      ON a.id=p.admin_id
    ORDER BY a.full_name
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Admin Permissions
      </h1>

      <div className="mt-8 overflow-auto rounded-3xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Admin</th>
              <th className="p-4 text-center">Customers</th>
              <th className="p-4 text-center">Orders</th>
              <th className="p-4 text-center">Invoices</th>
              <th className="p-4 text-center">Tickets</th>
              <th className="p-4 text-center">Leads</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((r:any)=>(
              <tr
                key={r.id}
                className="border-b border-white/5"
              >
                <td className="p-4 font-semibold">
                  {r.username}
                </td>

                <td className="p-4 text-center">
                  {r.customers_view ? "✓" : "✗"} / {r.customers_edit ? "✓" : "✗"}
                </td>

                <td className="p-4 text-center">
                  {r.orders_view ? "✓" : "✗"} / {r.orders_edit ? "✓" : "✗"}
                </td>

                <td className="p-4 text-center">
                  {r.invoices_view ? "✓" : "✗"} / {r.invoices_edit ? "✓" : "✗"}
                </td>

                <td className="p-4 text-center">
                  {r.tickets_view ? "✓" : "✗"} / {r.tickets_edit ? "✓" : "✗"}
                </td>

                <td className="p-4 text-center">
                  {r.leads_view ? "✓" : "✗"} / {r.leads_edit ? "✓" : "✗"}
                </td>

                <td className="p-4 text-center">
                  <a
                    href={`/admin/permissions/${r.admin_id}`}
                    className="rounded bg-cyan-500 px-3 py-2 text-black"
                  >
                    Edit
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
