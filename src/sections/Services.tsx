import {
  Server,
  Cloud,
  Shield,
  Database,
  Globe,
  Cpu
} from "lucide-react";

export default function Services() {
  const services = [
    { title: "Dedicated Servers", icon: Server },
    { title: "Cloud VPS", icon: Cloud },
    { title: "DDoS Protection", icon: Shield },
    { title: "Storage Servers", icon: Database },
    { title: "Global Network", icon: Globe },
    { title: "AMD EPYC Servers", icon: Cpu }
  ];

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            Infrastructure Services
          </h2>

          <p className="mt-4 text-gray-400">
            Enterprise-grade hosting solutions powered by global datacenters.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-cyan-500 hover:bg-cyan-500/5"
              >
                <Icon className="h-12 w-12 text-cyan-400" />

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-400">
                  High-performance infrastructure with premium connectivity,
                  enterprise security and instant deployment.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
