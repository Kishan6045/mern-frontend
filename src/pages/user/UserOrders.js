import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import { FaBox, FaDownload, FaTruck, FaCheckCircle } from "react-icons/fa";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [openOrder, setOpenOrder] = useState(null);

  const loadOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/order/user-orders`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (data.success) setOrders(data.orders || []);
    } catch (err) {
      console.log("User Orders Error", err);
    }
  };

  useEffect(() => {
    loadOrders();
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

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-600";
      case "Shipped":
        return "bg-blue-500";
      case "Out For Delivery":
        return "bg-orange-500";
      case "Cancelled":
        return "bg-red-600";
      default:
        return "bg-yellow-500";
    }
  };

  const STATUS_STEPS = ["Placed", "Shipped", "Out For Delivery", "Delivered"];

  const getStepIndex = (status) => STATUS_STEPS.indexOf(status);

  return (
    <Layout>
      <div className="p-6 pt-24 min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6 flex items-center gap-2">
          <FaBox /> My Orders
        </h1>

        {orders.length === 0 && (
          <p className="text-gray-400 text-lg">
            You haven’t ordered anything yet.
          </p>
        )}

        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-[#141414] border border-[#333] rounded-xl mb-6 p-5 shadow-lg hover:border-yellow-500 transition"
          >
            {/* ORDER HEADER */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold flex gap-2">
                  Order ID:
                  <span className="text-yellow-400 text-sm">{o._id}</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  Placed on: {new Date(o.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-sm rounded-lg font-semibold ${getStatusClass(
                  o.status
                )}`}
              >
                {o.status}
              </span>
            </div>

            {/* TIMELINE */}
           {/* ADVANCED AMAZON STYLE TIMELINE */}
<div className="relative flex items-center justify-between w-full mt-6">

  {STATUS_STEPS.map((step, index) => {
    const current = getStepIndex(o.status);
    const isCompleted = index <= current;

    return (
      <div key={step} className="flex flex-col items-center w-full relative">

        {/* LEFT LINE */}
        {index > 0 && (
          <div
            className={`absolute top-5 left-0 h-1 
              ${
                index - 1 < current
                  ? "bg-yellow-500"                 /* Solid yellow (completed) */
                  : "border-t border-dotted border-gray-500" /* Dotted grey (pending) */
              }
            `}
            style={{ width: "50%" }}
          ></div>
        )}

        {/* RIGHT LINE */}
        {index < STATUS_STEPS.length - 1 && (
          <div
            className={`absolute top-5 right-0 h-1 
              ${
                index < current
                  ? "bg-yellow-500"                  /* Solid yellow (completed) */
                  : "border-t border-dotted border-gray-500" /* Dotted grey (pending) */
              }
            `}
            style={{ width: "50%" }}
          ></div>
        )}

        {/* CIRCLE */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10
          ${
            isCompleted
              ? "bg-yellow-500 text-black"
              : "bg-[#333] text-gray-300"
          }`}
        >
          {index + 1}
        </div>

        {/* LABEL */}
        <p className="text-xs mt-2 text-gray-300 text-center">{step}</p>
      </div>
    );
  })}
</div>


            {/* PRODUCTS LIST */}
            <button
              onClick={() =>
                setOpenOrder(openOrder === o._id ? null : o._id)
              }
              className="mt-4 text-yellow-400 underline text-sm"
            >
              {openOrder === o._id ? "Hide Details" : "View Details"}
            </button>

            {openOrder === o._id && (
              <div className="mt-4 border-t border-[#333] pt-4">
                {o.products.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center bg-[#1b1b1b] p-3 rounded-lg mb-3"
                  >
                    <img
                      src={`${API}/api/v1/product/product-photo/${p._id}`}
                      className="w-16 h-16 rounded object-cover"
                      alt={p.name}
                    />
                    <div className="ml-4">
                      <h3 className="text-white font-semibold">{p.name}</h3>
                      <p className="text-yellow-400">₹{p.price}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <p className="text-gray-300">
                    <strong>Amount: </strong>₹{o.amount}
                  </p>
                  <p className="text-gray-300">
                    <strong>Payment:</strong> {o.payment?.method}
                  </p>
                </div>

                {/* DOWNLOAD BUTTON */}
                <button
                  onClick={() => downloadInvoice(o._id)}
                  className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 flex items-center gap-2"
                >
                  <FaDownload /> Download Invoice
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
