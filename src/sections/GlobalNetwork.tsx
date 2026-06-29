export default function GlobalNetwork() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <div className="text-cyan-400 font-semibold tracking-widest uppercase">
            Global Network
          </div>

          <h2 className="mt-4 text-5xl font-extrabold text-white">
            200+ Global Datacenter Locations
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-400">
            Enterprise infrastructure across North America,
            Europe, Asia Pacific and Middle East.
          </p>
        </div>

        <div className="mt-16 rounded-[40px] border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-xl">
          <img
            src="/assets/world-map.svg"
            alt="Global Datacenter Network"
            className="w-full"
          />
        </div>

      </div>
    </section>
  );
}
