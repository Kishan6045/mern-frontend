import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { API } from "../../config";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const { data } = await axios.get(`${API}/api/v1/order/user-orders`);
    setOrders(data.orders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Layout>
      <div className="p-6 text-white bg-black min-h-screen">
        <h1 className="text-3xl text-yellow-500 mb-6">My Orders</h1>

        {orders.map((o) => (
          <div key={o._id} className="bg-[#1f1f1f] p-4 mb-4 rounded-lg">
            <h2 className="text-xl font-semibold">Order ID: {o._id}</h2>
            <p className="text-gray-400">Status: {o.status}</p>
            <p className="text-gray-400">Amount: ₹{o.amount}</p>

            <div className="mt-3">
              {o.products.map((p) => (
                <p key={p._id} className="text-white">
                  - {p.name}
                </p>
              ))}
            </div>

            <p className="text-gray-400 mt-3">Date: {new Date(o.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
