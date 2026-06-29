export default function Solutions() {
  const solutions = [
    "Video Streaming",
    "Gaming Companies",
    "VPN Providers",
    "Content Delivery",
    "AI & Machine Learning",
    "Storage Servers",
    "IP Transit",
    "Crypto / Web3",
    "SaaS / IaaS / PaaS"
  ];

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            Most Common Use Cases
          </h2>

          <p className="mt-4 text-gray-400">
            Infrastructure trusted by modern internet businesses.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {solutions.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-lg font-semibold text-white hover:border-cyan-500"
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
