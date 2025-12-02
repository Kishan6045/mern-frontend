import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/Layout/Header";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { API } from "../../config";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/v1/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Account Created Successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black flex justify-center items-center px-4">
        <div className="bg-[#1b1b1b] p-8 rounded-xl w-full max-w-md shadow-xl">
          <h1 className="text-white text-3xl font-semibold mb-1 text-center">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm text-center mb-6">
            Join us today
          </p>

          <form onSubmit={handleSubmit}>
            <label className="text-gray-300 text-sm">Full Name</label>
            <div className="relative mt-1 mb-4">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#111] text-white pl-10 p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-yellow-600 outline-none"
              />
            </div>

            <label className="text-gray-300 text-sm">Email Address</label>
            <div className="relative mt-1 mb-4">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111] text-white pl-10 p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-yellow-600 outline-none"
              />
            </div>

            <label className="text-gray-300 text-sm">Password</label>
            <div className="relative mt-1 mb-4">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111] text-white pl-10 p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-yellow-600 outline-none"
              />
            </div>

            <label className="text-gray-300 text-sm">Confirm Password</label>
            <div className="relative mt-1 mb-6">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#111] text-white pl-10 p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-yellow-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d4a056] text-black font-semibold p-3 rounded-md hover:bg-[#c9974d] transition"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="text-gray-400 text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
