export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import InventoryTable from "@/src/components/admin/InventoryTable";

export default async function InventoryPage() {

  const [servers]: any = await db.query(`
    SELECT *
    FROM server_inventory
    ORDER BY id DESC
  `);

  const total = servers.length;
  const available = servers.filter((s:any)=>s.status==="available").length;
  const reserved = servers.filter((s:any)=>s.status==="reserved").length;
  const active = servers.filter((s:any)=>s.status==="active").length;
  const maintenance = servers.filter((s:any)=>s.status==="maintenance").length;

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Server Inventory
        </h1>

        <a
          href="/admin/inventory/new"
          className="rounded bg-cyan-500 px-5 py-3 font-bold text-black"
        >
          + Add Server
        </a>

      </div>

      <div className="grid md:grid-cols-5 gap-5 mt-8">

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="text-gray-400">Total</div>
          <div className="mt-2 text-3xl font-bold">{total}</div>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="text-gray-400">Available</div>
          <div className="mt-2 text-3xl font-bold text-green-400">
            {available}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="text-gray-400">Reserved</div>
          <div className="mt-2 text-3xl font-bold text-yellow-400">
            {reserved}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="text-gray-400">Active</div>
          <div className="mt-2 text-3xl font-bold text-cyan-400">
            {active}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="text-gray-400">Maintenance</div>
          <div className="mt-2 text-3xl font-bold text-red-400">
            {maintenance}
          </div>
        </div>

      </div>

      <div className="mt-8 rounded-3xl border border-white/10 p-4 overflow-auto">
        <InventoryTable servers={servers} />
      </div>

    </div>
  );
}
