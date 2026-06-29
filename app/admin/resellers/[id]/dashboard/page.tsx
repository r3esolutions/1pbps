import db from "@/src/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ResellerDashboard({ params }: any) {

  const { id } = await params;

  const [resellers]: any = await db.query(
    "SELECT * FROM resellers WHERE id=? LIMIT 1",
    [id]
  );

  if (!resellers.length) {
    notFound();
  }

  const reseller = resellers[0];

  const [[clients]]: any = await db.query(
    "SELECT COUNT(*) total FROM reseller_clients WHERE reseller_id=?",
    [id]
  );

  const [[wallet]]: any = await db.query(
    "SELECT credit FROM resellers WHERE id=?",
    [id]
  );

  const [[pending]]: any = await db.query(
    "SELECT IFNULL(SUM(commission_amount),0) total FROM reseller_commissions WHERE reseller_id=? AND status='pending'",
    [id]
  );

  const [[paid]]: any = await db.query(
    "SELECT IFNULL(SUM(commission_amount),0) total FROM reseller_commissions WHERE reseller_id=? AND status='paid'",
    [id]
  );

  const [walletHistory]: any = await db.query(
    `
    SELECT
      type,
      amount,
      balance_after,
      description,
      created_at
    FROM reseller_wallet_transactions
    WHERE reseller_id=?
    ORDER BY id DESC
    LIMIT 10
    `,
    [id]
  );

  const [commissions]: any = await db.query(
    `
    SELECT
      invoice_id,
      commission_amount,
      status,
      created_at
    FROM reseller_commissions
    WHERE reseller_id=?
    ORDER BY id DESC
    LIMIT 10
    `,
    [id]
  );

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          {reseller.company_name}
        </h1>

        <Link
          href={`/admin/resellers/${id}`}
          className="rounded bg-zinc-800 px-4 py-2"
        >
          Back
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Clients</div>
          <div className="mt-2 text-4xl font-bold">
            {clients.total}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Wallet</div>
          <div className="mt-2 text-4xl font-bold">
            ${Number(wallet.credit).toFixed(2)}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Pending Commission</div>
          <div className="mt-2 text-4xl font-bold text-yellow-400">
            ${Number(pending.total).toFixed(2)}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Paid Commission</div>
          <div className="mt-2 text-4xl font-bold text-green-400">
            ${Number(paid.total).toFixed(2)}
          </div>
        </div>

      </div>

    </div>
  );
}
