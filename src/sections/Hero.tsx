"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d455,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#2563eb33,transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          <div>
            <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Enterprise Infrastructure • 200+ Locations
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-white">
              Global
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Bare Metal
              </span>
              Infrastructure
            </h1>

            <p className="mt-8 text-xl text-gray-400">
              Dedicated Servers, GPU Servers, Cloud VPS and Enterprise Infrastructure.
            </p>

            <div className="mt-10 flex gap-4">
              <a href="/configure-server" className="rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-black">
                Deploy Now
              </a>

              <a href="/locations" className="rounded-2xl border border-white/20 px-8 py-4 text-white">
                View Locations
              </a>
            </div>
          </div>

          <div>
            <img
              src="/assets/world-map.svg"
              alt="Global Network"
              className="w-full opacity-90"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
