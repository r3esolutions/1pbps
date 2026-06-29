import {
  Shield,
  Globe,
  Headphones,
  Cpu
} from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: Globe,
      title: "Premium Global Network",
      text: "310+ Tbps capacity powered by a private global backbone."
    },
    {
      icon: Headphones,
      title: "Exceptional Client Service",
      text: "Real engineers available 24/7 with dedicated account managers."
    },
    {
      icon: Shield,
      title: "Built-In DDoS Protection",
      text: "Always-on protection included with every deployment."
    },
    {
      icon: Cpu,
      title: "Latest Hardware",
      text: "AMD EPYC, Intel Xeon and NVIDIA GPU infrastructure."
    }
  ];

  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            What's Included
          </h2>

          <p className="mt-4 text-gray-400">
            Enterprise-grade infrastructure built for demanding workloads.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <Icon className="h-12 w-12 text-cyan-400" />

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-400">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
