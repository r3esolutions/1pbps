import db from "@/src/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ResellerClients({ params }: any) {

  const { id } = await params;

  const [reseller]: any = await db.query(
    "SELECT * FROM resellers WHERE id=? LIMIT 1",
    [id]
  );

  if (!reseller.length) notFound();

  const [clients]: any = await db.query(`
    SELECT
      rc.id,
      c.id customer_id,
      c.full_name,
      c.email,
      c.phone,
      c.status
    FROM reseller_clients rc
    JOIN customers c
      ON c.id=rc.customer_id
    WHERE rc.reseller_id=?
    ORDER BY c.full_name
  `,[id]);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            {reseller[0].company_name}
          </h1>
          <p className="text-gray-400">
            Reseller Clients
          </p>
        </div>

        <Link
          href={`/admin/resellers/${id}`}
          className="rounded bg-zinc-800 px-4 py-2"
        >
          Back
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>

          {clients.map((c:any)=>(
            <tr
              key={c.id}
              className="border-t border-white/10"
            >
              <td className="p-4">{c.full_name}</td>
              <td className="p-4">{c.email}</td>
              <td className="p-4">{c.phone || "-"}</td>
              <td className="p-4 text-center">{c.status}</td>
            </tr>
          ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
