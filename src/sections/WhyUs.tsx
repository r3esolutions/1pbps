export default function WhyUs() {
  const items = [
    "310+ Tbps Network",
    "200+ Locations",
    "AMD EPYC Platform",
    "NVIDIA GPU Cloud",
    "DDoS Protection",
    "24/7 Engineers"
  ];

  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            Why 1PBPS
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white"
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
