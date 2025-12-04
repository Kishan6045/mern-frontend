// client/src/pages/admin/AdminOrders.js

import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layout/AdminMenu";

const STATUS_OPTIONS = [
  "Pending",
  "Accepted",
  "Packed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
  "Cancelled",
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Build URL with query params
  const buildUrl = () => {
    const params = [];
    if (statusFilter && statusFilter !== "All") {
      params.push(`status=${encodeURIComponent(statusFilter)}`);
    }
    if (fromDate) params.push(`from=${fromDate}`);
    if (toDate) params.push(`to=${toDate}`);

    const qs = params.length ? `?${params.join("&")}` : "";
    return `${API}/api/v1/order/all-orders${qs}`;
  };

  // Load all orders
  const loadOrders = async () => {
    try {
      const url = buildUrl();
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.log("Order Load Error", err);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      loadOrders();
    }
    // eslint-disable-next-line
  }, [statusFilter]);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `${API}/api/v1/order/order-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.success) loadOrders();
    } catch (err) {
      console.log("Status Update Error", err);
    }
  };

  // Local change meta
  const handleMetaChange = (id, field, value) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, [field]: value } : o))
    );
  };

  const saveMeta = async (order) => {
    try {
      await axios.put(
        `${API}/api/v1/order/order-meta/${order._id}`,
        {
          trackingId: order.trackingId,
          courierPartner: order.courierPartner,
          notes: order.notes,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      loadOrders();
    } catch (err) {
      console.log("Meta Save Error", err);
    }
  };

  // Download Invoice
  const downloadInvoice = async (orderId) => {
    try {
      const res = await axios.get(
        `${API}/api/v1/order/invoice/${orderId}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
          responseType: "blob",
        }
      );

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

  // Download Shipping Label
  const downloadLabel = async (orderId) => {
    try {
      const res = await axios.get(
        `${API}/api/v1/order/shipping-label/${orderId}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `shipping-label-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log("Label Error", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* LEFT SIDEBAR */}
      <AdminMenu />

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-8 pt-20">
        <h1 className="text-3xl text-yellow-500 font-bold mb-6 text-center">
          Manage Orders
        </h1>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {["All", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-sm ${
                statusFilter === s
                  ? "bg-yellow-500 text-black"
                  : "bg-[#222] text-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Date Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <input
            type="date"
            className="bg-[#222] text-white p-2 rounded"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="bg-[#222] text-white p-2 rounded"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            onClick={loadOrders}
            className="px-4 py-2 bg-yellow-500 text-black rounded"
          >
            Apply Date Filter
          </button>
        </div>

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
              <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg font-bold">
                    Order ID:{" "}
                    <span className="text-yellow-400">{o._id}</span>
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">
                    Buyer: {o.buyer?.name} ({o.buyer?.email})
                  </p>
                  <p className="text-yellow-400 text-xl font-semibold mt-1">
                    Total: ₹{o.amount}
                  </p>
                </div>
              </div>

              {/* Address & Payment */}
              <div className="mb-3 text-sm text-gray-300">
                <p>
                  <span className="font-semibold">Address:</span> {o.address}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span>{" "}
                  {o.payment?.method?.toUpperCase()} (
                  {o.payment?.status || "pending"})
                </p>
              </div>

              {/* Status + Meta */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Status */}
                <div>
                  <label className="mr-3 text-gray-300 block mb-1">
                    Status:
                  </label>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="bg-[#333] text-white p-2 rounded-lg border border-gray-600 w-full"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tracking + Courier */}
                <div className="space-y-2">
                  <div>
                    <label className="text-gray-300 text-sm">Tracking ID</label>
                    <input
                      type="text"
                      value={o.trackingId || ""}
                      onChange={(e) =>
                        handleMetaChange(o._id, "trackingId", e.target.value)
                      }
                      className="w-full bg-[#333] text-white p-2 rounded-lg border border-gray-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm">
                      Courier Partner
                    </label>
                    <input
                      type="text"
                      value={o.courierPartner || ""}
                      onChange={(e) =>
                        handleMetaChange(
                          o._id,
                          "courierPartner",
                          e.target.value
                        )
                      }
                      className="w-full bg-[#333] text-white p-2 rounded-lg border border-gray-600 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Notes + Save Button */}
              <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-1">
                  Seller Notes
                </label>
                <textarea
                  value={o.notes || ""}
                  onChange={(e) =>
                    handleMetaChange(o._id, "notes", e.target.value)
                  }
                  className="w-full bg-[#333] text-white p-2 rounded-lg border border-gray-600 text-sm"
                  rows={2}
                />
                <button
                  onClick={() => saveMeta(o)}
                  className="mt-2 bg-yellow-500 text-black px-4 py-1 rounded font-semibold hover:bg-yellow-600 text-sm"
                >
                  Save Details
                </button>
              </div>

              {/* Invoice & Label */}
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={() => downloadInvoice(o._id)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-600 text-sm"
                >
                  Download Invoice PDF
                </button>

                <button
                  onClick={() => downloadLabel(o._id)}
                  className="bg-[#222] border border-yellow-500 text-yellow-300 px-4 py-2 rounded font-semibold hover:bg-[#333] text-sm"
                >
                  Download Shipping Label
                </button>
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
                      <p className="text-white text-sm">{p.name}</p>
                      <p className="text-yellow-500 font-semibold text-sm">
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
    </div>
  );
}
