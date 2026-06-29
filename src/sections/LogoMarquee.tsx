export default function LogoMarquee() {
  const logos = [
    "AMD","Intel","NVIDIA","Equinix",
    "DE-CIX","Arelion","Datapacket","M247"
  ];

  return (
    <section className="overflow-hidden border-y border-white/10 py-8">
      <div className="animate-pulse flex justify-center gap-10 text-xl font-bold text-gray-500">
        {logos.map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </div>
    </section>
  );
}
