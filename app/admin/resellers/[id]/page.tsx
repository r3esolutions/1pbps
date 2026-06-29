import db from "@/src/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditReseller({ params }: any) {

  const { id } = await params;

  const [rows]: any = await db.query(
    `
    SELECT *
    FROM resellers
    WHERE id=?
    LIMIT 1
    `,
    [id]
  );

  if (!rows.length) {
    notFound();
  }

  const r = rows[0];

  return (
    <div className="max-w-3xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Edit Reseller
      </h1>

      <form
        action={`/api/admin/resellers/${id}`}
        method="POST"
        className="space-y-5"
      >

        <input
          name="company_name"
          defaultValue={r.company_name}
          className="w-full rounded bg-zinc-900 p-3"
        />

        <input
          name="credit"
          defaultValue={r.credit}
          className="w-full rounded bg-zinc-900 p-3"
        />

        <input
          name="discount_percent"
          defaultValue={r.discount_percent}
          className="w-full rounded bg-zinc-900 p-3"
        />

        <select
          name="status"
          defaultValue={r.status}
          className="w-full rounded bg-zinc-900 p-3"
        >
          <option>Active</option>
          <option>Suspended</option>
        </select>

        <button
          className="rounded bg-cyan-600 px-6 py-3 font-bold text-black"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}
