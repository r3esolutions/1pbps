import Image from "next/image";

export default function Network() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            Global Network
          </h2>

          <p className="mt-4 text-gray-400">
            Low latency infrastructure across worldwide locations.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
          <Image
            src="/assets/maps/world-map.svg"
            alt="World Map"
            width={1200}
            height={600}
            className="w-full opacity-80"
          />
        </div>

      </div>
    </section>
  );
}
