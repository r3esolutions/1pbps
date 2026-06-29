export default function Sidebar() {
  return (
    <div className="w-64 border-r border-white/10 min-h-screen p-6">

      <h2 className="text-2xl font-bold text-cyan-400">
        Client Area
      </h2>

      <div className="mt-8 space-y-4">

        <a href="/dashboard">Dashboard</a><br/>
        <a href="/dashboard/services">Services</a><br/>
        <a href="/dashboard/invoices">Invoices</a><br/>
        <a href="/dashboard/tickets">Tickets</a><br/>
        <a href="/dashboard/wallet">Wallet</a><br/>
        <a href="/dashboard/profile">Profile</a><br/>
        <a href="/dashboard/security">Security</a>

      </div>

    </div>
  );
}
