export default function TrustedBy() {
  const logos = [
    "AMD",
    "Intel",
    "NVIDIA",
    "M247",
    "Datapacket",
    "Arelion",
    "DE-CIX",
    "Equinix"
  ];

  return (
    <section className="py-12 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-gray-500">
          Infrastructure & Network Partners
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="rounded-2xl border border-white/10 bg-white/5 py-4 text-center font-bold text-gray-300"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
