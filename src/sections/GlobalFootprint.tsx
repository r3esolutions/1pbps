export default function GlobalFootprint() {
  const regions = [
    {
      title: "Europe",
      locations: "Amsterdam, Frankfurt, London, Paris, Madrid",
      count: "30+ Locations"
    },
    {
      title: "North America",
      locations: "New York, Dallas, Miami, Chicago, Toronto",
      count: "20+ Locations"
    },
    {
      title: "Asia Pacific",
      locations: "Singapore, Tokyo, Seoul, Sydney, Mumbai",
      count: "15+ Locations"
    },
    {
      title: "Middle East",
      locations: "Dubai, Riyadh, Doha, Muscat",
      count: "10+ Locations"
    },
    {
      title: "Latin America",
      locations: "São Paulo, Santiago, Buenos Aires, Lima",
      count: "10+ Locations"
    },
    {
      title: "Africa",
      locations: "Johannesburg, Cape Town",
      count: "5+ Locations"
    }
  ];

  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            Global Datacenter Footprint
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Deploy dedicated servers closer to your customers with
            infrastructure spanning multiple continents.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {regions.map((region) => (
            <div
              key={region.title}
              className="rounded-3xl border border-cyan-500/20 bg-black p-8"
            >
              <h3 className="text-2xl font-bold text-cyan-400">
                {region.title}
              </h3>

              <div className="mt-3 text-sm text-gray-500">
                {region.count}
              </div>

              <p className="mt-6 text-gray-300">
                {region.locations}
              </p>

              <a
                href="/locations"
                className="mt-8 inline-block rounded-xl border border-cyan-500/30 px-5 py-3 text-cyan-400"
              >
                Explore Locations
              </a>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
