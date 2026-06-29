"use client";

export default function Sidebar() {

  async function logout() {

    await fetch("/api/logout",{
      method:"POST"
    });

    localStorage.removeItem("token");

    window.location.href="/login";
  }

  return (
    <div className="w-72 min-h-screen border-r border-white/10 bg-zinc-950 p-6">

      <h2 className="text-3xl font-bold text-cyan-400">
        1PBPS Client
      </h2>

      <div className="mt-8 space-y-4">

        <a className="block" href="/dashboard">Dashboard</a>

        <a className="block" href="/dashboard/services">
          Services
        </a>

        <a className="block" href="/dashboard/orders">
          Orders
        </a>

        <a className="block" href="/dashboard/invoices">
          Invoices
        </a>

        <a className="block" href="/dashboard/tickets">
          Tickets
        </a>

        <a className="block" href="/dashboard/wallet">
          Wallet
        </a>

        <a className="block" href="/dashboard/profile">
          Profile
        </a>

        <button
          onClick={logout}
          className="mt-6 w-full rounded-xl bg-red-600 py-3 font-bold text-white"
        >
          Logout
        </button>

      </div>

    </div>
  );
}
