import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

function UserDashboard() {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="pt-20 px-6 text-white bg-black min-h-screen">
        <h1 className="text-2xl font-bold mb-2">
          Hello, {auth?.user?.name || "User"} 👋
        </h1>
        <p className="text-gray-400 mb-6">Manage your account and orders.</p>

        <div className="space-y-4 max-w-md">
          <Link
            to="/dashboard/user/profile"
            className="block bg-[#1a1a1a] p-4 rounded-lg border border-yellow-600 hover:bg-[#222]"
          >
            ▶ Update Profile
          </Link>

          <Link
            to="/dashboard/user/orders"
            className="block bg-[#1a1a1a] p-4 rounded-lg border border-yellow-600 hover:bg-[#222]"
          >
            ▶ My Orders
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default UserDashboard;
