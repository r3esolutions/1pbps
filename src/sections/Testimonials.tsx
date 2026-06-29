export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-bold text-white">
          Trusted Worldwide
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <p className="text-gray-300">
              Excellent network quality and low latency across Europe.
            </p>
            <div className="mt-6 text-cyan-400 font-bold">
              Gaming Company
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <p className="text-gray-300">
              Stable AMD EPYC servers with outstanding performance.
            </p>
            <div className="mt-6 text-cyan-400 font-bold">
              SaaS Provider
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <p className="text-gray-300">
              Fast deployment and responsive support team.
            </p>
            <div className="mt-6 text-cyan-400 font-bold">
              Enterprise Client
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
