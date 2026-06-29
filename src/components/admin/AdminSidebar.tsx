import Link from "next/link";

const item =
  "block rounded-lg px-4 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white transition";

const heading =
  "mt-6 mb-2 px-2 text-xs font-bold uppercase tracking-widest text-gray-500";

export default function AdminSidebar() {
  return (
    <aside className="w-72 min-h-screen border-r border-white/10 bg-zinc-950 p-6">

      <h2 className="mb-8 text-3xl font-bold text-cyan-400">
        1PBPS Admin
      </h2>

      <nav>

        <div className={heading}>Dashboard</div>
        <Link href="/admin" className={item}>Dashboard</Link>

        <div className={heading}>Clients</div>
        <Link href="/admin/customers" className={item}>Customers</Link>
        <Link href="/admin/leads" className={item}>Leads</Link>

        <div className={heading}>Billing</div>
        <Link href="/admin/orders" className={item}>Orders</Link>
        <Link href="/admin/invoices" className={item}>Invoices</Link>
        <Link href="/admin/payments" className={item}>Payments</Link>
        <Link href="/admin/transactions" className={item}>Transactions</Link>

        <div className={heading}>Reseller Management</div>
        <Link href="/admin/resellers" className={item}>Resellers</Link>
        <Link href="/admin/commissions" className={item}>Commissions</Link>
        <Link href="/admin/reports/top-resellers" className={item}>Top Resellers</Link>
        <Link href="/admin/reports/commissions" className={item}>Commission Reports</Link>

        <div className={heading}>Support</div>
        <Link href="/admin/tickets" className={item}>Tickets</Link>
        <Link href="/admin/knowledgebase" className={item}>Knowledgebase</Link>
        <Link href="/admin/announcements" className={item}>Announcements</Link>

        <div className={heading}>Infrastructure</div>
        <Link href="/admin/inventory" className={item}>Server Inventory</Link>
        <Link href="/admin/ip-pools" className={item}>IP Pools</Link>

        <div className={heading}>Administration</div>
        <Link href="/admin/activity" className={item}>Activity Logs</Link>
        <Link href="/admin/email-templates" className={item}>Email Templates</Link>
        <Link href="/admin/permissions" className={item}>Permissions</Link>
        <Link href="/admin/settings" className={item}>Settings</Link>
        <Link href="/admin/system" className={item}>System</Link>

      </nav>

    </aside>
  );
}
