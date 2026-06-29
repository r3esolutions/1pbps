export default function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">

          <div>
            <div className="text-2xl font-bold text-cyan-400">200+</div>
            <div className="text-sm text-gray-400">Locations</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-cyan-400">310Tbps+</div>
            <div className="text-sm text-gray-400">Network Capacity</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-cyan-400">99.99%</div>
            <div className="text-sm text-gray-400">Uptime SLA</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-cyan-400">24/7</div>
            <div className="text-sm text-gray-400">Expert Support</div>
          </div>

        </div>
      </div>
    </section>
  );
}
