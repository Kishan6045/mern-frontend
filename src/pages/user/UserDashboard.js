import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="pt-20 px-6 text-white">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="space-y-4">
        <Link to="/dashboard/user/profile" className="block text-yellow-400">
          ▶ Update Profile
        </Link>

        <Link to="/dashboard/user/orders" className="block text-yellow-400">
          ▶ My Orders
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;
