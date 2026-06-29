import AdminSidebar from "@/src/components/admin/AdminSidebar";
import AdminHeader from "@/src/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      <AdminSidebar />

      <div className="flex flex-1 flex-col">

        <AdminHeader />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
