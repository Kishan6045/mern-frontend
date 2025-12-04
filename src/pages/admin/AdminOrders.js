import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { API } from "../../config";
import { useAuth } from "../../context/auth";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // Load all orders
  const loadOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/order/all-orders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // ✅ FIXED
        },
      });

      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.log("Order Load Error", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Update Order Status
  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `${API}/api/v1/order/order-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // ✅ FIXED
          },
        }
      );

      if (data.success) {
        loadOrders(); // refresh list
      }
    } catch (err) {
      console.log("Status Update Error", err);
    }
  };

  return (
    <Layout>
      <div className="p-8 bg-black min-h-screen text-white">

        <h1 className="text-3xl text-yellow-500 font-bold mb-8">
          Manage Orders
        </h1>

        {orders.length === 0 && (
          <p className="text-center text-gray-400">No orders found.</p>
        )}

        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg border border-yellow-600"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  Order ID: <span className="text-yellow-400">{o._id}</span>
                </h2>
                <p className="text-gray-300">
                  {new Date(o.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Buyer info */}
              <p className="text-gray-300">Buyer: {o.buyer?.name}</p>
              <p className="text-gray-300">Email: {o.buyer?.email}</p>

              {/* Amount */}
              <p className="text-yellow-400 text-xl font-semibold mt-2">
                Total: ₹{o.amount}
              </p>

              {/* Payment */}
              <p className="text-gray-300 mt-2">
                Payment: {o.payment?.method?.toUpperCase()}
              </p>

              {/* Status Dropdown */}
              <div className="mt-4">
                <label className="mr-3 text-gray-300">Status:</label>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  className="bg-[#333] text-white p-2 rounded-lg border border-gray-600"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Products */}
              <div className="mt-5">
                <h3 className="text-yellow-500 font-semibold mb-2">
                  Products:
                </h3>

                {o.products?.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center gap-4 bg-[#222] p-3 rounded-lg mb-3"
                  >
                    <img
                      src={`${API}/api/v1/product/product-photo/${p._id}`}
                      className="h-16 w-16 object-cover rounded-md"
                      alt=""
                    />
                    <div>
                      <p className="text-white">{p.name}</p>
                      <p className="text-yellow-500 font-semibold">
                        ₹{p.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}
