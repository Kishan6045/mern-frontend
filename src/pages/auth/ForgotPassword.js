import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../config";
import Header from "../../components/Layout/Header";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/v1/auth/forgot-password-age`, {
        email,
        age,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password Reset Successful");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-black flex justify-center items-center px-4">
        <div className="bg-[#1b1b1b] p-8 rounded-xl w-full max-w-md shadow-xl">

          <h1 className="text-white text-3xl font-semibold mb-4 text-center">
            Reset Password
          </h1>

          <form onSubmit={handleSubmit}>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="w-full bg-[#111] text-white p-3 mb-3 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="text-gray-300 text-sm">
              What is your age in 2025?
            </label>
            <input
              type="number"
              className="w-full bg-[#111] text-white p-3 mb-3 rounded-md"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <label className="text-gray-300 text-sm">New Password</label>
            <input
              type="password"
              className="w-full bg-[#111] text-white p-3 mb-5 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#d4a056] text-black p-3 rounded-md"
            >
              Reset Password
            </button>
          </form>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
