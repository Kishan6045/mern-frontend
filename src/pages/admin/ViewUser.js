import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config";
import axios from "axios";
import { useAuth } from "../../context/auth";
import AdminLayout from "../../components/Layout/AdminLayout";

export default function ViewUser() {
  const { id } = useParams();
  const [auth] = useAuth();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);

  const loadData = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/auth/user-detail/${id}`, {
        headers: { Authorization: auth?.token },
      });

      if (data.success) {
        setUser(data.user);
        setOrders(data.orders || []);
        setStats(data.stats || null);
      }
    } catch (error) {
      console.log("Error loading user details", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // SHOW LOADING INSIDE LAYOUT (smooth UX)
  if (!user) {
    return (
      <AdminLayout>
        <p className="text-white text-center p-10 text-lg">Loading user...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl text-yellow-500 font-bold mb-6">
        User Details
      </h1>

      {/* USER BASIC INFO */}
      <div className="bg-[#1c1c1c] p-6 rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-3">{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Age: {user.age || "Not set"}</p>
        <p>Role: {user.role === 1 ? "Admin" : "User"}</p>
        <p>Joined: {new Date(user.createdAt).toLocaleString()}</p>
      </div>

      {/* USER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1c1c1c] p-5 rounded-xl">
          <h2 className="text-lg text-gray-300">Total Orders</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {stats?.orders || 0}
          </p>
        </div>

        <div className="bg-[#1c1c1c] p-5 rounded-xl">
          <h2 className="text-lg text-gray-300">Total Spent</h2>
          <p className="text-3xl font-bold text-green-400">
            ₹{stats?.totalSpent || 0}
          </p>
        </div>

        <div className="bg-[#1c1c1c] p-5 rounded-xl">
          <h2 className="text-lg text-gray-300">Last Order</h2>
          <p className="text-md">
            {stats?.lastOrder
              ? new Date(stats.lastOrder.createdAt).toLocaleString()
              : "No orders"}
          </p>
        </div>
      </div>

      {/* ORDER HISTORY */}
      <div className="bg-[#1c1c1c] p-6 rounded-xl">
        <h2 className="text-xl mb-4 text-yellow-500">Order History</h2>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders found</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-300">
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b border-gray-800">
                  <td className="p-2">{o._id}</td>
                  <td className="p-2">₹{o.amount}</td>
                  <td className="p-2">{o.status}</td>
                  <td className="p-2">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
