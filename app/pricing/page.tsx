export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24 text-white">
      <h1 className="text-4xl md:text-6xl font-bold">
        Dedicated Server Pricing
      </h1>

      <p className="mt-6 text-gray-400">
        Enterprise dedicated servers, GPU servers and cloud infrastructure.
      </p>

      <div className="mt-12">
        <a
          href="/configure-server"
          className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
        >
          Configure Server
        </a>
      </div>
    </main>
  );
}
