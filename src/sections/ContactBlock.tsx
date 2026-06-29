export default function ContactBlock() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-[40px] border border-cyan-500/20 bg-cyan-500/10 p-16 text-center">

          <h2 className="text-5xl font-bold text-white">
            Questions or Special Requirements?
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Talk to our infrastructure specialists and get a custom solution.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black">
              Contact Sales
            </button>

            <button className="rounded-xl border border-white/20 px-8 py-4 text-white">
              Schedule Call
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
