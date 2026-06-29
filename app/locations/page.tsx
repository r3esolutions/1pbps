import { locations } from "@/src/lib/locations";

export const metadata = {
  title: "Global Server Locations | 1PBPS",
};

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="mx-auto max-w-7xl px-6 py-24">

        <h1 className="text-5xl md:text-7xl font-bold">
          Global Server Locations
        </h1>

        <p className="mt-6 max-w-4xl text-xl text-gray-400">
          Deploy Dedicated Servers across {locations.length}+ strategic
          datacenter locations worldwide.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

          {locations.map((location) => {
            const city = location
              .split("-")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <a
                key={location}
                href={`/dedicated-servers/${location}`}
                className="rounded-3xl border border-cyan-500/20 bg-zinc-950 p-6 transition hover:border-cyan-400 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-white">
                  {city}
                </h3>

                <p className="mt-3 text-gray-400">
                  Dedicated Servers Available
                </p>

                <div className="mt-6 text-cyan-400">
                  View Servers →
                </div>
              </a>
            );
          })}

        </div>

      </section>

    </main>
  );
}
