export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-zinc-950 px-8 py-5">

      <div>
        <h1 className="text-2xl font-bold text-white">
          1PBPS Admin Panel
        </h1>

        <p className="text-sm text-gray-400">
          Dedicated Server Management Platform
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="text-right">
          <div className="font-semibold text-white">
            Administrator
          </div>

          <div className="text-sm text-gray-400">
            Super Admin
          </div>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
          A
        </div>

        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </form>

      </div>

    </header>
  );
}
