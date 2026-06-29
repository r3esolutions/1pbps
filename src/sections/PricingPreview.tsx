export default function PricingPreview() {
  const plans = [
    {
      title: "AMD EPYC Server",
      price: "$99",
      specs: "8 Cores • 32GB RAM • NVMe SSD"
    },
    {
      title: "Intel Xeon Server",
      price: "$79",
      specs: "8 Cores • 32GB RAM • SSD"
    },
    {
      title: "GPU Server",
      price: "$299",
      specs: "RTX GPU • AI Ready"
    },
    {
      title: "Storage Server",
      price: "$89",
      specs: "Large HDD Storage"
    }
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-bold text-white">
          Dedicated Server Plans
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8"
            >
              <h3 className="text-xl font-bold text-white">
                {plan.title}
              </h3>

              <div className="mt-6 text-5xl font-bold text-cyan-400">
                {plan.price}
              </div>

              <div className="mt-3 text-gray-400">
                {plan.specs}
              </div>

              <a
                href="/configure-server"
                className="mt-8 inline-block rounded-xl bg-cyan-400 px-5 py-3 font-bold text-black"
              >
                Configure
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
