export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        className="rounded-full bg-green-500 px-5 py-3 font-semibold text-black shadow-lg"
      >
        WhatsApp
      </a>

      <a
        href="tel:+911234567890"
        className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-black shadow-lg"
      >
        Call Sales
      </a>

    </div>
  );
}
