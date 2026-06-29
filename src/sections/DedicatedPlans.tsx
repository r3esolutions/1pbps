export default function DedicatedPlans() {
  const plans = [
    {
      tier: "ENTRY LEVEL",
      cpu: "AMD EPYC 4245P",
      spec: "6 Cores / 12 Threads",
      price: "$289/mo",
    },
    {
      tier: "PERFORMANCE+",
      cpu: "AMD EPYC 4464P",
      spec: "12 Cores / 24 Threads",
      price: "$349/mo",
    },
    {
      tier: "PERFORMANCE+",
      cpu: "AMD EPYC 4585PX",
      spec: "16 Cores / 32 Threads",
      price: "$449/mo",
    },
    {
      tier: "ENTERPRISE",
      cpu: "AMD EPYC 9355",
      spec: "32 Cores / 64 Threads",
      price: "$1329/mo",
    },
    {
      tier: "HIGH-END",
      cpu: "AMD EPYC 9555",
      spec: "64 Cores / 128 Threads",
      price: "$1519/mo",
    },
    {
      tier: "ULTRA",
      cpu: "Dual AMD EPYC 9754",
      spec: "256 Cores / 512 Threads",
      price: "Custom Quote",
    },
  ];

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Dedicated Server Configurations
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Enterprise AMD EPYC Servers Available Across Europe,
            North America, Asia Pacific, Latin America and
            Middle East Regions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.cpu}
              className="rounded-3xl border border-cyan-500/20 bg-zinc-950 p-8 transition hover:border-cyan-400"
            >
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                {plan.tier}
              </span>

              <h3 className="mt-6 text-2xl md:text-3xl font-bold text-white">
                {plan.cpu}
              </h3>

              <p className="mt-2 text-gray-400">
                {plan.spec}
              </p>

              <ul className="mt-6 space-y-3 text-gray-300">
                <li>✓ DDR5 Memory</li>
                <li>✓ Enterprise NVMe Storage</li>
                <li>✓ DDoS Protection</li>
                <li>✓ IPv4 & IPv6 Support</li>
                <li>✓ Instant Deployment</li>
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-3xl font-bold text-cyan-400">
                  {plan.price}
                <a href="/configure-server" className="mt-6 inline-block rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black">Configure Server</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
