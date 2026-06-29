export default function Partners() {
  const partners = [
    "M247",
    "Datapacket",
    "Cogent",
    "Arelion",
    "Hurricane Electric",
    "Cloudflare"
  ];

  return (
    <section className="bg-zinc-950 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold text-white">
          Network Partners
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {partners.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 py-8 text-center text-gray-300"
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
