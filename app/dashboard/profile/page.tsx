export const dynamic = "force-dynamic";

import { requireCustomer } from "@/src/lib/auth";

export default async function ProfilePage() {
  const user = await requireCustomer();

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h1 className="text-4xl font-bold">
              {user.full_name}
            </h1>

            <p className="text-gray-400 mt-2">
              Customer Profile
            </p>
          </div>

          <div className="rounded-2xl bg-cyan-500/10 px-6 py-4">
            <div className="text-gray-400">
              Wallet Balance
            </div>

            <div className="text-3xl font-bold text-cyan-400">
              ${Number(user.wallet_balance || 0).toFixed(2)}
            </div>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
          <h2 className="text-xl font-bold mb-4">
            Personal Information
          </h2>

          <div className="space-y-3">
            <div><b>Name:</b> {user.full_name}</div>
            <div><b>Email:</b> {user.email}</div>
            <div><b>Phone:</b> {user.phone}</div>
            <div><b>WhatsApp:</b> {user.whatsapp}</div>
            <div><b>Telegram:</b> {user.telegram}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
          <h2 className="text-xl font-bold mb-4">
            Company Information
          </h2>

          <div className="space-y-3">
            <div><b>Company:</b> {user.company_name}</div>
            <div><b>GST:</b> {user.gst_number}</div>
            <div><b>PAN:</b> {user.pan_number}</div>
            <div><b>Country:</b> {user.country}</div>
            <div><b>Status:</b> {user.status}</div>
          </div>
        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">
            Email Verified
          </div>

          <div className="mt-2 text-2xl font-bold text-green-400">
            {user.email_verified ? "Yes" : "No"}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">
            Mobile Verified
          </div>

          <div className="mt-2 text-2xl font-bold text-green-400">
            {user.mobile_verified ? "Yes" : "No"}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">
            KYC Status
          </div>

          <div className="mt-2 text-2xl font-bold text-yellow-400">
            {user.kyc_status}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="text-gray-400">
            Affiliate Balance
          </div>

          <div className="mt-2 text-2xl font-bold text-cyan-400">
            ${Number(user.affiliate_balance || 0).toFixed(2)}
          </div>
        </div>

      </div>

    </div>
  );
}
