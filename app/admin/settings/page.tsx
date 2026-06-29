export default function SettingsPage() {

  const settings = [
    {
      title: "General Settings",
      desc: "Website name, logo, company information"
    },
    {
      title: "Payment Gateways",
      desc: "Crypto, Stripe, PayPal, Bank Transfer"
    },
    {
      title: "Mail Settings",
      desc: "SMTP configuration"
    },
    {
      title: "Security",
      desc: "Admin authentication and access"
    },
    {
      title: "Affiliate System",
      desc: "Referral commission configuration"
    },
    {
      title: "Automation",
      desc: "Provisioning and invoice automation"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Admin Settings
      </h1>

      <p className="mt-2 text-gray-400">
        Configure your hosting platform.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

        {settings.map((s)=>(
          <div
            key={s.title}
            className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 hover:border-cyan-500 transition"
          >
            <h2 className="text-xl font-bold">
              {s.title}
            </h2>

            <p className="mt-3 text-gray-400">
              {s.desc}
            </p>

            <button
              className="mt-6 rounded bg-cyan-500 px-5 py-2 font-semibold text-black"
            >
              Configure
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}
