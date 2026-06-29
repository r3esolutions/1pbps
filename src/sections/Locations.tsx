export default function Locations() {
  const regions = [
    {
      title: "EUROPE",
      count: "30+ Locations",
      highlight: "Amsterdam • Frankfurt • London • Paris"
    },
    {
      title: "NORTH AMERICA",
      count: "17+ Locations",
      highlight: "New York • Dallas • Miami • Los Angeles"
    },
    {
      title: "ASIA PACIFIC",
      count: "9+ Locations",
      highlight: "Singapore • Tokyo • Seoul • Sydney"
    },
    {
      title: "LATIN AMERICA",
      count: "6+ Locations",
      highlight: "São Paulo • Santiago • Lima"
    },
    {
      title: "MIDDLE EAST & AFRICA",
      count: "5+ Locations",
      highlight: "Fujairah • Istanbul • Johannesburg"
    }
  ];

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Global Dedicated Server Locations
          </h2>

          <p className="mt-4 text-gray-400">
            Deploy infrastructure across strategic locations worldwide.
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <input
              type="text"
              placeholder="Search Location..."
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-6 py-4 text-white outline-none"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {regions.map((region) => (
            <div
              key={region.title}
              className="rounded-3xl border border-cyan-500/20 bg-zinc-950 p-8 transition hover:border-cyan-400"
            >
              <h3 className="text-2xl font-bold text-cyan-400">
                {region.title}
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                {region.count}
              </p>

              <p className="mt-6 text-gray-300">
                {region.highlight}
              </p>

              <button className="mt-8 rounded-xl border border-cyan-500/30 px-5 py-3 text-cyan-400">
                View Locations
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
