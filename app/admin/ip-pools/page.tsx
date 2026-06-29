export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function IpPoolsPage() {

  const [rows]: any = await db.query(`
    SELECT
      id,
      location,
      subnet,
      gateway,
      netmask,
      vlan,
      created_at
    FROM ip_pools
    ORDER BY location,id
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          IP Pools
        </h1>

        <a
          href="/admin/ip-pools/new"
          className="rounded bg-cyan-500 px-5 py-3 font-bold text-black"
        >
          + Add IP Pool
        </a>

      </div>

      <div className="mt-8 overflow-auto rounded-3xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Subnet</th>
              <th className="p-4 text-left">Gateway</th>
              <th className="p-4 text-left">Netmask</th>
              <th className="p-4 text-left">VLAN</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((p:any)=>(
              <tr
                key={p.id}
                className="border-b border-white/5"
              >
                <td className="p-4">{p.location}</td>
                <td className="p-4">{p.subnet}</td>
                <td className="p-4">{p.gateway}</td>
                <td className="p-4">{p.netmask}</td>
                <td className="p-4">{p.vlan}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
