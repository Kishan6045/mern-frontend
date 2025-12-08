import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/Layout/AdminLayout";


export default function ManageUsers() {
  const [auth] = useAuth();
    const navigate = useNavigate();   // ✅ ADD THIS


  const [users, setUsers] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  // Pagination
  const [page, setPage] = useState(1);
  const usersPerPage = 8;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/auth/all-users`, {
        headers: { Authorization: auth?.token },
      });

      if (data.success) setUsers(data.users);
    } catch (error) {
      console.log("Error loading users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // FILTERS
  const filteredUsers = users
    .filter((u) =>
      search.trim() === ""
        ? true
        : u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) =>
      roleFilter === "all"
        ? true
        : roleFilter === "admin"
          ? u.role === 1
          : u.role === 0
    );

  // SORT
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "name_asc") return a.name.localeCompare(b.name);
    if (sortOrder === "name_desc") return b.name.localeCompare(a.name);
    return 0;
  });

  // PAGINATION LOGIC
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIdx = (page - 1) * usersPerPage;
  const currentUsers = sortedUsers.slice(startIdx, startIdx + usersPerPage);

  return (
   <AdminLayout>
        <h1 className="text-3xl font-bold text-yellow-500 text-center mb-6">
          Manage Users
        </h1>

        {/* SEARCH + FILTER */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg mb-5 flex flex-wrap items-center gap-4">

          {/* SEARCH */}
          <input
            type="text"
            className="bg-[#333] text-white p-2 rounded w-60"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ROLE FILTER */}
          <select
            className="bg-[#333] text-white p-2 rounded"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {/* SORT */}
          <select
            className="bg-[#333] text-white p-2 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort</option>
            <option value="name_asc">Name A → Z</option>
            <option value="name_desc">Name Z → A</option>
          </select>
        </div>

        {/* USER TABLE */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-xl overflow-x-auto">

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#333] text-yellow-500">
                <th className="p-3 border-b border-gray-600">#</th>
                <th className="p-3 border-b border-gray-600">Name</th>
                <th className="p-3 border-b border-gray-600">Email</th>
                <th className="p-3 border-b border-gray-600">Age</th>
                <th className="p-3 border-b border-gray-600">Role</th>
                <th className="p-3 border-b border-gray-600">Status</th>
                <th className="p-3 border-b border-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((u, i) => (
                <tr key={u._id} className="hover:bg-[#2e2e2e]">
                  <td className="p-3 border-b border-gray-700">
                    {(page - 1) * usersPerPage + i + 1}
                  </td>

                  <td className="p-3 border-b border-gray-700">{u.name}</td>

                  <td className="p-3 border-b border-gray-700">{u.email}</td>

                  <td className="p-3 border-b border-gray-700">{u.age}</td>

                  <td className="p-3 border-b border-gray-700">
                    <span
                      className={`px-2 py-1 rounded text-sm ${u.role === 1 ? "bg-green-600" : "bg-blue-600"
                        }`}
                    >
                      {u.role === 1 ? "Admin" : "User"}
                    </span>
                  </td>

                  <td className="p-3 border-b border-gray-700">Active</td>

                  <td className="p-3 border-b border-gray-700">
                    <button
                      className="bg-gray-700 px-3 py-1 rounded mr-2"
                      onClick={() => navigate(`/dashboard/admin/user/${u._id}`)}
                    >
                      View
                    </button>

                    <button className="bg-gray-700 px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-600 px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="bg-[#333] px-4 py-2 rounded disabled:opacity-40"
            disabled={page === 1}
          >
            Prev
          </button>

          <span className="text-black bg-yellow-500 px-4 py-2 rounded">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="bg-[#333] px-4 py-2 rounded disabled:opacity-40"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>

     </AdminLayout>
  );
}
