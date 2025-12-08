// import { NavLink } from "react-router-dom";

// export default function AdminMenu() {
//   return (
//     <div className="w-64 fixed top-0 left-0 h-screen bg-[#111] text-white p-5 z-50 overflow-y-auto">
//       <h2 className="text-xl font-bold mb-6 pt-11 text-yellow-500">Admin Panel</h2>

//       <div className="flex flex-col space-y-4 text-lg">
//         <NavLink to="/dashboard/admin" className="hover:text-yellow-400">📊 Dashboard Overview</NavLink>
//         <NavLink to="/dashboard/admin/create-category" className="hover:text-yellow-400">🗂️ Create Category</NavLink>
//         <NavLink to="/dashboard/admin/create-product" className="hover:text-yellow-400">🛍️ Create Product</NavLink>
//         <NavLink to="/dashboard/admin/products" className="hover:text-yellow-400">📦 Manage Products</NavLink>
//         <NavLink to="/dashboard/admin/orders" className="hover:text-yellow-400">📑 Manage Orders</NavLink>
//         <NavLink to="/dashboard/admin/analytics" className="hover:text-yellow-400">📈 Sales Analytics</NavLink>
//         <NavLink to="/dashboard/admin/users" className="hover:text-yellow-400">👤 Manage Users</NavLink>
//       </div>
//     </div>
//   );
// }






import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } fixed top-0 left-0 h-screen bg-[#111] text-white p-5 z-50 overflow-y-auto transition-all duration-300`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-yellow-400 mb-4 text-xl"
      >
        {open ? "⬅ Collapse" : "➡"}
      </button>

      <h2 className="text-xl font-bold mb-6 pt-3 text-yellow-500">
        {open ? "Admin Panel" : ""}
      </h2>

      <div className="flex flex-col space-y-4 text-lg">
        

        <NavLink to="/dashboard/admin" className="hover:text-yellow-400">
          📊 {open && "Dashboard Overview"}
        </NavLink>

        <NavLink to="/dashboard/admin/create-category" className="hover:text-yellow-400">
          🗂️ {open && "Create Category"}
        </NavLink>

        <NavLink to="/dashboard/admin/create-product" className="hover:text-yellow-400">
          🛍️ {open && "Create Product"}
        </NavLink>

        <NavLink to="/dashboard/admin/products" className="hover:text-yellow-400">
          📦 {open && "Manage Products"}
        </NavLink>

        <NavLink to="/dashboard/admin/orders" className="hover:text-yellow-400">
          📑 {open && "Manage Orders"}
        </NavLink>

        <NavLink to="/dashboard/admin/analytics" className="hover:text-yellow-400">
          📈 {open && "Sales Analytics"}
        </NavLink>

        <NavLink to="/dashboard/admin/users" className="hover:text-yellow-400">
          👤 {open && "Manage Users"}
        </NavLink>

        <NavLink to="/" className="hover:text-yellow-400">
          🏠 {open && "Home Page"}
        </NavLink>
      </div>
    </div>
  );
}
