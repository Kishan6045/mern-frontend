import AdminMenu from "../../components/Layout/AdminMenu";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-white text-white">

      {/* LEFT ADMIN SIDEBAR */}
      <AdminMenu />

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 p-18 pt-14 px-9 pt-25">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
          Welcome, Admin!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg">
            <h2 className="text-lg mb-2">Total Categories</h2>
            <p className="text-2xl font-bold text-yellow-500">8</p>
          </div>

          <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg">
            <h2 className="text-lg mb-2">Total Products</h2>
            <p className="text-2xl font-bold text-yellow-500">120</p>
          </div>

          <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg">
            <h2 className="text-lg mb-2">Pending Orders</h2>
            <p className="text-2xl font-bold text-yellow-500">5</p>
          </div>

        </div>
      </div>
    </div>
  );
}
