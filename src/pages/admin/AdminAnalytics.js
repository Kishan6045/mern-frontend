import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import adminLayout from "../../components/Layout/AdminLayout";  

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import AdminLayout from "../../components/Layout/AdminLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminAnalytics() {
  const [auth] = useAuth();
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const [daily, setDaily] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
  });
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

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
        setDays(data.days);
        setDaily(data.daily || []);
        setSummary({
          totalRevenue: data.totalRevenue || 0,
          totalOrders: data.totalOrders || 0,
        });
        setTopProducts(data.topProducts || []);
        setTopCategories(data.topCategories || []);
      }
    } catch (err) {
      console.log("Analytics Load Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) loadAnalytics();
    // eslint-disable-next-line
  }, [auth?.token]);

  // ========= Chart Data =========
  const labels = daily.map((d) => d.date);

  const revenueData = {
    labels,
    datasets: [
      {
        label: "Revenue (₹)",
        data: daily.map((d) => d.amount),
        borderColor: "rgba(250, 204, 21, 1)", // yellow
        backgroundColor: "rgba(250, 204, 21, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const ordersData = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: daily.map((d) => d.orders),
        backgroundColor: "rgba(96, 165, 250, 0.8)", // blue
      },
    ],
  };

  const categoriesData = {
    labels: topCategories.map((c) => c.name),
    datasets: [
      {
        data: topCategories.map((c) => c.revenue),
        backgroundColor: [
          "rgba(250, 204, 21, 0.8)",
          "rgba(96, 165, 250, 0.8)",
          "rgba(52, 211, 153, 0.8)",
          "rgba(251, 113, 133, 0.8)",
          "rgba(167, 139, 250, 0.8)",
        ],
      },
    ],
  };

  return (
    <AdminLayout>

      <div className=" pt-16 p-8">
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg border border-yellow-600/40">
            <h2 className="text-sm text-gray-400 mb-1">Total Revenue</h2>
            <p className="text-2xl font-bold text-yellow-500">
              ₹{summary.totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg border border-blue-500/40">
            <h2 className="text-sm text-gray-400 mb-1">Total Orders</h2>
            <p className="text-2xl font-bold text-blue-400">
              {summary.totalOrders}
            </p>
          </div>

          <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg border border-green-500/40">
            <h2 className="text-sm text-gray-400 mb-1">
              Avg Order Value (AOV)
            </h2>
            <p className="text-2xl font-bold text-green-400">
              ₹
              {summary.totalOrders
                ? Math.round(summary.totalRevenue / summary.totalOrders)
                : 0}
            </p>
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-400">Loading charts...</p>
        )}

        {!loading && daily.length === 0 && (
          <p className="text-center text-gray-400">
            No orders in selected period.
          </p>
        )}

        {!loading && daily.length > 0 && (
          <div className="space-y-10">
            {/* Revenue Line Chart */}
            <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg h-80">
              <h2 className="text-xl mb-4 text-yellow-400">
                Revenue (₹) per day
              </h2>
              <Line
                data={revenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: true },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `₹${value}`,
                      },
                    },
                  },
                }}
              />
            </div>

            {/* Orders Bar + Top Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg h-80 lg:col-span-2">
                <h2 className="text-xl mb-4 text-blue-400">
                  Orders per day
                </h2>
                <Bar
                  data={ordersData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: { grid: { display: false } },
                      y: { beginAtZero: true },
                    },
                  }}
                />
              </div>

              <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg h-80">
                <h2 className="text-xl mb-4 text-green-400">
                  Top Categories (₹)
                </h2>
                {topCategories.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No category data yet.
                  </p>
                ) : (
                  <Doughnut
                    data={categoriesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: { color: "#e5e7eb" },
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>

            {/* Top Products Table */}
            <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg">
              <h2 className="text-xl mb-4 text-yellow-400">
                Top Selling Products
              </h2>

              {topProducts.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No product analytics yet.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 text-gray-300">
                      <th className="py-2 text-left">Product</th>
                      <th className="py-2 text-right">Units Sold</th>
                      <th className="py-2 text-right">Revenue (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p) => (
                      <tr
                        key={p.productId}
                        className="border-b border-gray-800"
                      >
                        <td className="py-2">{p.name}</td>
                        <td className="py-2 text-right">{p.sold}</td>
                        <td className="py-2 text-right">
                          ₹{p.revenue.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
      </AdminLayout>
  );
}























