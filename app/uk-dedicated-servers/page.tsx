export const metadata = {
  title: "UK Dedicated Servers | 1PBPS",
  description:
    "Enterprise dedicated servers across New York, Dallas, Miami, Chicago, Seattle and Los Angeles.",
};

export default function USAPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-24">

        <h1 className="text-5xl font-bold">
          UK Dedicated Servers
        </h1>

        <p className="mt-6 max-w-4xl text-xl text-gray-400">
          Deploy AMD EPYC dedicated servers across major United States
          datacenter locations with premium bandwidth and DDoS protection.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <a href="/dedicated-servers/new-york" className="rounded-2xl bg-zinc-900 p-6">
            New York
          </a>

          <a href="/dedicated-servers/dallas" className="rounded-2xl bg-zinc-900 p-6">
            Dallas
          </a>

          <a href="/dedicated-servers/miami" className="rounded-2xl bg-zinc-900 p-6">
            Miami
          </a>

          <a href="/dedicated-servers/chicago" className="rounded-2xl bg-zinc-900 p-6">
            Chicago
          </a>

          <a href="/dedicated-servers/seattle" className="rounded-2xl bg-zinc-900 p-6">
            Seattle
          </a>

          <a href="/dedicated-servers/los-angeles" className="rounded-2xl bg-zinc-900 p-6">
            Los Angeles
          </a>

        </div>

      </section>
    </main>
  );
}
