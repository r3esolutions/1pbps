export default function PaymentSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">

      <div className="rounded-3xl border border-green-500/20 bg-zinc-950 p-12 text-center">

        <h1 className="text-5xl font-bold text-green-400">
          Payment Received
        </h1>

        <p className="mt-6 text-gray-400">
          Your order has been received and is now awaiting provisioning.
        </p>

      </div>

    </main>
  );
}
