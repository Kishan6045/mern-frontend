// client/src/pages/admin/AdminDashboard.js

import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminLayout from "../../components/Layout/AdminLayout";

export default function AdminDashboard() {
  const [auth] = useAuth();
  const [summary, setSummary] = useState({
    totalOrders: 0,
    delivered: 0,
    revenue: 0,
  });

  const loadSummary = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/admin/daily-summary`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      if (data.success) {
        setSummary(data);
      }
    } catch (err) {
      console.log("Summary Error", err);
    }
  };

  useEffect(() => {
    if (auth?.token) loadSummary();
    // eslint-disable-next-line
  }, [auth?.token]);

  return (
    <AdminLayout>
    <div className=" min-h-screen bg-black text-white">
      <div className="flex-1 p-8 pt-20">
        <h1 className="text-3xl text-yellow-500 font-bold mb-6 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1f1f1f] p-5 rounded-xl">
            <h3 className="text-gray-400 text-sm">Today's Orders</h3>
            <p className="text-2xl text-yellow-500">
              {summary.totalOrders}
            </p>
          </div>

          <div className="bg-[#1f1f1f] p-5 rounded-xl">
            <h3 className="text-gray-400 text-sm">Delivered Today</h3>
            <p className="text-2xl text-green-400">
              {summary.delivered}
            </p>
          </div>

          <div className="bg-[#1f1f1f] p-5 rounded-xl">
            <h3 className="text-gray-400 text-sm">Revenue Today</h3>
            <p className="text-2xl text-yellow-500">
              ₹{summary.revenue}
            </p>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
