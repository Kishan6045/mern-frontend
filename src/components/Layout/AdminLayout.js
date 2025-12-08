import AdminMenu from "./AdminMenu";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      
      {/* LEFT FIXED SIDEBAR */}
      <AdminMenu />

      {/* RIGHT MAIN CONTENT */}
      <div className="flex-1 ml-64 min-h-screen bg-white text-black p-10 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}
