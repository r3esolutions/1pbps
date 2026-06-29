export const dynamic = "force-dynamic";

import crypto from "crypto";
import db from "@/src/lib/db";
import { requireCustomer } from "@/src/lib/auth";

export default async function ReferralsPage() {

  const customer = await requireCustomer();

  let [referral]: any = await db.query(
    "SELECT * FROM referrals WHERE customer_id=? LIMIT 1",
    [customer.id]
  );

  if (!referral.length) {

    const code = crypto.randomBytes(4).toString("hex").toUpperCase();

    await db.query(
      `
      INSERT INTO referrals
      (customer_id,referral_code)
      VALUES
      (?,?)
      `,
      [customer.id, code]
    );

    [referral] = await db.query(
      "SELECT * FROM referrals WHERE customer_id=? LIMIT 1",
      [customer.id]
    );
  }

  const [commissions]: any = await db.query(
    `
    SELECT *
    FROM affiliate_commissions
    WHERE referrer_customer_id=?
    ORDER BY id DESC
    `,
    [customer.id]
  );

  const pending = commissions
    .filter((c:any)=>c.status==="pending")
    .reduce((s:number,c:any)=>s+Number(c.commission_amount),0);

  const approved = commissions
    .filter((c:any)=>c.status==="approved")
    .reduce((s:number,c:any)=>s+Number(c.commission_amount),0);

  const paid = commissions
    .filter((c:any)=>c.status==="paid")
    .reduce((s:number,c:any)=>s+Number(c.commission_amount),0);

  const referralLink =
    `${process.env.NEXT_PUBLIC_APP_URL || "https://1pbps.com"}/register?ref=${referral[0].referral_code}`;

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Affiliate Program
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Referral Code</div>
          <div className="mt-2 text-xl font-bold text-cyan-400">
            {referral[0].referral_code}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Pending</div>
          <div className="mt-2 text-3xl font-bold text-yellow-400">
            ${pending.toFixed(2)}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Approved</div>
          <div className="mt-2 text-3xl font-bold text-green-400">
            ${approved.toFixed(2)}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">Paid</div>
          <div className="mt-2 text-3xl font-bold text-cyan-400">
            ${paid.toFixed(2)}
          </div>
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-white/10 p-6">
        <div className="text-gray-400 mb-2">Referral Link</div>
        <div className="break-all text-cyan-400">
          {referralLink}
        </div>
      </div>

    </div>
  );
}
