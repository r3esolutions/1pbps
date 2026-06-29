import ServerCategories from "@/src/sections/ServerCategories";
import DedicatedPlans from "@/src/sections/DedicatedPlans";
import Network from "@/src/sections/Network";
import WhyUs from "@/src/sections/WhyUs";
import CTA from "@/src/sections/CTA";

export const metadata = {
  title: "Dedicated Servers | AMD EPYC Bare Metal Infrastructure | 1PBPS",
  description:
    "Enterprise Dedicated Servers powered by AMD EPYC and Intel Xeon processors across 200+ global locations.",
};

export default function DedicatedServersPage() {
  return (
    <main className="bg-black text-white">

      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold">
            Enterprise Dedicated Servers
          </h1>

          <p className="mt-8 text-xl text-gray-400">
            Deploy high-performance AMD EPYC and Intel Xeon bare metal
            infrastructure across 200+ global datacenter locations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/configure-server"
              className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
            >
              Configure Server
            </a>

            <a
              href="/locations"
              className="rounded-xl border border-white/20 px-6 py-3"
            >
              View Locations
            </a>
          </div>
        </div>
      </section>

      <ServerCategories />
      <DedicatedPlans />
      <Network />
      <WhyUs />
      <CTA />

    </main>
  );
}
