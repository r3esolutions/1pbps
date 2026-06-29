export default function Pricing() {
  const plans = [
    {
      title: "CPU Servers",
      price: "$49",
      specs: [
        "AMD EPYC / Intel Xeon",
        "NVMe Storage",
        "1 Gbps Port",
        "DDoS Protection"
      ]
    },
    {
      title: "GPU Servers",
      price: "$299",
      specs: [
        "NVIDIA RTX / H100",
        "AI Training",
        "AI Inference",
        "Dedicated Resources"
      ]
    },
    {
      title: "Cloud VPS",
      price: "$6",
      specs: [
        "Instant Deploy",
        "NVMe SSD",
        "Private Network",
        "Full Root Access"
      ]
    },
    {
      title: "IP Transit",
      price: "Quote",
      specs: [
        "BGP Support",
        "Global Backbone",
        "Low Latency",
        "Custom Commit"
      ]
    }
  ];

  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Pricing
          </h2>

          <p className="mt-4 text-gray-400">
            Infrastructure pricing for every workload.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">

          {plans.map((plan) => (
            <div
              key={plan.title}
              className="rounded-3xl border border-white/10 bg-black p-8"
            >
              <h3 className="text-2xl font-bold text-white">
                {plan.title}
              </h3>

              <div className="mt-6 text-5xl font-bold text-cyan-400">
                {plan.price}
              </div>

              <ul className="mt-8 space-y-3 text-gray-300">
                {plan.specs.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>

              <a href="/configure-server" className="mt-8 block w-full rounded-xl bg-cyan-500 py-3 text-center font-bold text-black">
                Configure
              </a>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
