import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminAnalytics() {
  const [auth] = useAuth();
  const [data, setData] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
  });

  const loadAnalytics = async (d = days) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/v1/admin/sales-analytics?days=${d}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        setData(data.daily || []);
        setSummary({
          totalRevenue: data.totalRevenue,
          totalOrders: data.totalOrders,
        });
        setDays(data.days);
      }
    } catch (err) {
      console.log("Analytics Load Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminMenu />

      <div className="flex-1 pt-16 p-8">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
          Sales Analytics
        </h1>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              days === 7 ? "bg-yellow-500 text-black" : "bg-[#222]"
            }`}
            onClick={() => loadAnalytics(7)}
          >
            Last 7 days
          </button>
          <button
            className={`px-4 py-2 rounded ${
              days === 30 ? "bg-yellow-500 text-black" : "bg-[#222]"
            }`}
            onClick={() => loadAnalytics(30)}
          >
            Last 30 days
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg">
            <h2 className="text-lg mb-2">Total Revenue</h2>
            <p className="text-2xl font-bold text-yellow-500">
              ₹{summary.totalRevenue}
            </p>
          </div>

          <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg">
            <h2 className="text-lg mb-2">Total Orders</h2>
            <p className="text-2xl font-bold text-yellow-500">
              {summary.totalOrders}
            </p>
          </div>
        </div>

        {loading && <p className="text-center text-gray-400">Loading chart...</p>}

        {!loading && data.length === 0 && (
          <p className="text-center text-gray-400">
            No orders in selected period.
          </p>
        )}

        {!loading && data.length > 0 && (
          <div className="space-y-10">

            {/* Revenue Line Chart */}
            <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg h-80">
              <h2 className="text-xl mb-4 text-yellow-400">
                Revenue (₹) per day
              </h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#facc15" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Orders Bar Chart */}
            <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg h-80">
              <h2 className="text-xl mb-4 text-yellow-400">
                Orders per day
              </h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
