export default function ServerCategories() {
  const servers = [
    {
      title: "AMD EPYC Servers",
      text: "Latest generation AMD EPYC dedicated servers with DDR5 memory and NVMe storage.",
      link: "/dedicated-servers"
    },
    {
      title: "Intel Xeon Servers",
      text: "Enterprise Intel Xeon platforms optimized for mission critical workloads.",
      link: "/dedicated-servers"
    },
    {
      title: "GPU Servers",
      text: "NVIDIA GPU infrastructure for AI training, inference and HPC applications.",
      link: "/gpu-servers"
    },
    {
      title: "Storage Servers",
      text: "High-capacity storage platforms with enterprise SSD and HDD configurations.",
      link: "/dedicated-servers"
    },
    {
      title: "Colocation",
      text: "Secure colocation services in global datacenters with redundant power and connectivity.",
      link: "/contact"
    },
    {
      title: "IP Transit",
      text: "Premium bandwidth, BGP connectivity and enterprise network solutions.",
      link: "/network"
    }
  ];

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            Infrastructure Solutions
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Enterprise infrastructure deployed across global datacenters,
            optimized for performance, scalability and reliability.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {servers.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-cyan-500/20 bg-zinc-950 p-8 transition hover:border-cyan-400"
            >
              <h3 className="text-2xl font-bold text-cyan-400">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-300">
                {item.text}
              </p>

              <a
                href={item.link}
                className="mt-8 inline-block rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black"
              >
                Learn More
              </a>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
