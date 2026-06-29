import { Globe, Cloud, ShieldCheck, Headphones } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Globe,
      number: "200+",
      label: "Server Locations",
    },
    {
      icon: Cloud,
      number: "60+",
      label: "Cloud Regions",
    },
    {
      icon: ShieldCheck,
      number: "99.99%",
      label: "Uptime SLA",
    },
    {
      icon: Headphones,
      number: "24/7",
      label: "Expert Support",
    },
  ];

  return (
    <section className="relative -mt-20 z-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-4 rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <Icon className="h-10 w-10 text-cyan-400" />

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {item.number}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
