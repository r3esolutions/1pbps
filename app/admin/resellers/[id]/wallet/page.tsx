import db from "@/src/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function WalletPage({ params }: any) {

  const { id } = await params;

  const [rows]: any = await db.query(
    "SELECT * FROM resellers WHERE id=? LIMIT 1",
    [id]
  );

  if (!rows.length) notFound();

  const reseller = rows[0];

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold mb-6">
        Wallet
      </h1>

      <div className="mb-8 rounded-xl border border-white/10 p-6">
        <p className="text-xl">
          Current Credit:
        </p>

        <p className="mt-2 text-4xl font-bold text-cyan-400">
          ${Number(reseller.credit).toFixed(2)}
        </p>
      </div>

      <form
        action={`/api/admin/resellers/${id}/wallet`}
        method="POST"
        className="space-y-5"
      >

        <select
          name="type"
          className="w-full rounded bg-zinc-900 p-3"
        >
          <option value="add">Add Credit</option>
          <option value="deduct">Deduct Credit</option>
        </select>

        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount"
          className="w-full rounded bg-zinc-900 p-3"
        />

        <button
          className="rounded bg-cyan-600 px-6 py-3 font-bold text-black"
        >
          Update Wallet
        </button>

      </form>

    </div>
  );
}
