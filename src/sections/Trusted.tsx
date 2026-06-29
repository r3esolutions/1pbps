export default function Trusted() {
  const brands = [
    "AMD EPYC",
    "Intel Xeon",
    "NVMe SSD",
    "Cloud VPS",
    "10Gbps Network",
    "DDoS Protected"
  ];

  return (
    <section className="bg-zinc-950 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-10 text-center text-sm uppercase tracking-widest text-gray-500">
          Trusted Infrastructure
        </p>

        <div className="grid gap-4 md:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="rounded-xl border border-white/10 bg-white/5 py-6 text-center text-gray-300"
            >
              {brand}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
