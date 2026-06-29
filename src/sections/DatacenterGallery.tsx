export default function DatacenterGallery() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-bold text-white">
          Global Datacenter Infrastructure
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <img src="/assets/dc1.jpg" className="rounded-3xl" alt="" />
          <img src="/assets/dc2.jpg" className="rounded-3xl" alt="" />
          <img src="/assets/dc3.jpg" className="rounded-3xl" alt="" />
        </div>
      </div>
    </section>
  );
}
