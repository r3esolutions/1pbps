export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { notFound } from "next/navigation";

export default async function PermissionEditor({
  params,
}:{
  params:Promise<{id:string}>
}){

  const { id } = await params;

  const [rows]:any = await db.query(`
    SELECT
      p.*,
      a.full_name
    FROM admin_permissions p
    LEFT JOIN admin_users a
      ON a.id=p.admin_id
    WHERE p.admin_id=?
    LIMIT 1
  `,[id]);

  if(!rows.length){
    notFound();
  }

  const p = rows[0];

  return(
    <div className="max-w-5xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Permissions
      </h1>

      <div className="mt-2 text-gray-400">
        {p.full_name}
      </div>

      <form
        action="/api/admin/permissions"
        method="post"
        className="mt-8 space-y-6"
      >

        <input
          type="hidden"
          name="admin_id"
          value={p.admin_id}
        />

        {[
          ["customers_view","Customers View"],
          ["customers_edit","Customers Edit"],
          ["orders_view","Orders View"],
          ["orders_edit","Orders Edit"],
          ["invoices_view","Invoices View"],
          ["invoices_edit","Invoices Edit"],
          ["tickets_view","Tickets View"],
          ["tickets_edit","Tickets Edit"],
          ["leads_view","Leads View"],
          ["leads_edit","Leads Edit"]
        ].map(([field,label])=>(

          <label
            key={field}
            className="flex items-center gap-4"
          >

            <input
              type="checkbox"
              name={field}
              defaultChecked={!!p[field]}
            />

            {label}

          </label>

        ))}

        <button
          className="rounded bg-cyan-500 px-6 py-3 font-bold text-black"
        >
          Save Permissions
        </button>

      </form>

    </div>
  );

}
