import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { API } from "../../config";
import { useAuth } from "../../context/auth";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const loadOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/order/user-orders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data.success) setOrders(data.orders || []);
    } catch (err) {
      console.log("User Orders Error", err);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line
  }, []);

  const downloadInvoice = async (orderId) => {
    try {
      const res = await axios.get(`${API}/api/v1/order/invoice/${orderId}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log("Invoice Error", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-400";
      case "Shipped":
        return "text-blue-400";
      case "Cancelled":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <Layout>
      <div className="p-6 text-white bg-black min-h-screen pt-20">
        <h1 className="text-3xl text-yellow-500 mb-6">My Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-400">You have no orders yet.</p>
        )}

        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-[#1f1f1f] p-4 mb-4 rounded-lg border border-[#333]"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">
                Order ID:{" "}
                <span className="text-yellow-400 text-sm">{o._id}</span>
              </h2>
              <p className="text-gray-400 text-sm">
                {new Date(o.createdAt).toLocaleString()}
              </p>
            </div>

            <p className={getStatusColor(o.status)}>
              Status: {o.status}
            </p>
            <p className="text-gray-300">Amount: ₹{o.amount}</p>
            <p className="text-gray-400">Payment: {o.payment?.method}</p>

            <div className="mt-3">
              <h3 className="text-yellow-500 font-semibold mb-1">Products:</h3>
              {o.products.map((p) => (
                <p key={p._id} className="text-white text-sm">
                  - {p.name} (₹{p.price})
                </p>
              ))}
            </div>

            <button
              onClick={() => downloadInvoice(o._id)}
              className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600"
            >
              Download Invoice PDF
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
