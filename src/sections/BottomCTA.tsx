export default function BottomCTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-12 text-center">
          <h2 className="text-5xl font-bold text-white">
            Ready To Deploy?
          </h2>

          <p className="mt-6 text-gray-400">
            Enterprise Dedicated Servers in 200+ Locations Worldwide.
          </p>

          <a
            href="/configure-server"
            className="mt-8 inline-block rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-black"
          >
            Configure Server
          </a>
        </div>
      </div>
    </section>
  );
}
