import { NavLink } from "react-router-dom";
import Lay from "./Lay";

export default function AdminMenu() {
  return (
    <Lay>
    <div className=" w-full h-full bg-[#1f1f1e] text-white p-5">

      <h2 className="text-xl font-bold mb-6 pt-11 text-yellow-500">Admin Panel</h2>

      <div className="flex flex-col space-y-4 text-lg">

        <NavLink
          to="/dashboard/admin"
          className="hover:text-yellow-400"
        >
          📊 Dashboard Overview
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-category"
          className="hover:text-yellow-400"
        >
          🗂️ Create Category
        </NavLink>

       
        <NavLink
          to="/dashboard/admin/create-product"
          className="hover:text-yellow-400"
        >
          🛍️ Create Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className="hover:text-yellow-400"
        >
          📦 Manage Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/orders"
          className="hover:text-yellow-400"
        >
          📑 Manage Orders
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
          className="hover:text-yellow-400"
        >
          👤 Manage Users
        </NavLink>

      </div>
    </div>
    </Lay>
  );
}
