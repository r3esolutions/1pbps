import db from "@/src/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AssignCustomer({ params }: any) {

  const { id } = await params;

  const [customers]: any = await db.query(`
    SELECT
      id,
      full_name,
      email
    FROM customers
    WHERE id NOT IN (
      SELECT customer_id
      FROM reseller_clients
    )
    ORDER BY full_name
  `);

  return (
    <div className="max-w-3xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Assign Customer
      </h1>

      <form
        action={`/api/admin/resellers/${id}/assign`}
        method="POST"
        className="space-y-6"
      >

        <select
          name="customer_id"
          className="w-full rounded bg-zinc-900 p-3"
        >
          {customers.map((c:any)=>(
            <option key={c.id} value={c.id}>
              {c.full_name} ({c.email})
            </option>
          ))}
        </select>

        <div className="flex gap-4">

          <button
            className="rounded bg-cyan-600 px-6 py-3 font-bold text-black"
          >
            Assign
          </button>

          <Link
            href={`/admin/resellers/${id}/clients`}
            className="rounded bg-zinc-800 px-6 py-3"
          >
            Cancel
          </Link>

        </div>

      </form>

    </div>
  );
}
