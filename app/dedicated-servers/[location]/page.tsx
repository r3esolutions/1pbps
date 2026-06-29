import type { Metadata } from "next";
export async function generateMetadata({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const city = location.charAt(0).toUpperCase() + location.slice(1).replace(/-/g, " ");
  return {
    title: `Dedicated Servers in ${city} | 1PBPS`,
    description: `Dedicated Servers in ${city} with AMD EPYC CPUs, NVMe SSD storage, DDoS protection and premium global bandwidth.`,
  };
}


export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;

  const city =
    location.charAt(0).toUpperCase() +
    location.slice(1).replace(/-/g, " ");

  return (
    <main className="bg-black text-white">

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold">
          Dedicated Servers in {city}
        </h1>

        <p className="mt-6 max-w-4xl text-lg text-gray-400">
          Enterprise dedicated servers in {city} with AMD EPYC CPUs,
          NVMe SSD storage, DDoS protection and premium bandwidth.
        </p>

        <div className="mt-10 flex gap-4">
          <a
href={`/configure-server?location=${location}&server=EPYC%204245P`}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
          >
            Configure Server
          </a>

          <a
            href="/contact"
            className="rounded-xl border border-white/20 px-6 py-3"
          >
            Contact Sales
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold">
          Why Choose {city} Datacenter
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h3 className="font-bold">AMD EPYC Servers</h3>
            <p className="mt-3 text-gray-400">
              Latest generation AMD EPYC processors.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h3 className="font-bold">NVMe Storage</h3>
            <p className="mt-3 text-gray-400">
              High performance enterprise SSD storage.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h3 className="font-bold">DDoS Protection</h3>
            <p className="mt-3 text-gray-400">
              Enterprise network protection included.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h3 className="font-bold">24/7 Support</h3>
            <p className="mt-3 text-gray-400">
              Expert infrastructure support team.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

import { locations } from "@/src/lib/locations";

export async function generateStaticParams() {
  return locations.map((location) => ({
    location,
  }));
}
