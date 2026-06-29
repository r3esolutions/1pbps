import Sidebar from "./Sidebar";

export default function ClientLayout({
  children,
}:{
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#0b0f19]">

      <Sidebar />

      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}
