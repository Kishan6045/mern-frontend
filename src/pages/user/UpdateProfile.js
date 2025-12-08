import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { API } from "../../config";
import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiHash,
} from "react-icons/fi";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function UpdateProfile() {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Prefill user data
  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name || "");
      setEmail(auth.user.email || "");
      setAge(auth.user.age || "");
      setPhone(auth.user.phone || "");
      setAddress(auth.user.address || "");
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(
        `${API}/api/v1/auth/profile`,
        {
          name,
          email,                  // ✅ EMAIL वापस body में
          age,
          phone,
          address,
          password: password || undefined, // optional
        },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );

      if (data?.success) {
        toast.success("Profile updated successfully");

        const updated = { ...auth, user: data.user };
        setAuth(updated);
        localStorage.setItem("auth", JSON.stringify(updated));
        setPassword("");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error.response?.data || error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-10 px-4 bg-black text-white min-h-screen">

        {/* ================= PROFILE HEADER ================= */}
        <div className="max-w-2xl mx-auto bg-[#1a1a1a] p-6 rounded-2xl shadow-xl border border-[#333] flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center text-2xl font-bold">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <h2 className="text-xl font-bold">{name || "User"}</h2>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
        </div>

        {/* ================= FORM CARD ================= */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto mt-8 bg-[#121212] p-8 rounded-2xl shadow-[0_0_25px_#00000070] border border-[#2a2a2a] space-y-6"
        >
          <h3 className="text-xl font-semibold text-yellow-400 mb-3">
            Personal Information
          </h3>

          {/* Name */}
          <div className="group">
            <label className="text-gray-400 text-sm">Full Name</label>
            <div className="flex items-center bg-[#1f1f1f] p-3 mt-1 rounded-lg border border-transparent focus-within:border-yellow-500 transition">
              <FiUser className="mr-3 text-gray-400" />
              <input
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="text-gray-400 text-sm">Age</label>
            <div className="flex items-center bg-[#1f1f1f] p-3 mt-1 rounded-lg border border-transparent focus-within:border-yellow-500 transition">
              <FiHash className="mr-3 text-gray-400" />
              <input
                type="number"
                className="bg-transparent outline-none w-full"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>

          {/* ========== Contact Section ========== */}
          <h3 className="text-xl font-semibold text-yellow-400 mt-6 mb-3">
            Contact Information
          </h3>

          {/* Email */}
          <div>
            <label className="text-gray-400 text-sm">Email (not editable)</label>
            <div className="flex items-center bg-[#272727] p-3 mt-1 rounded-lg opacity-70 cursor-not-allowed">
              <FiMail className="mr-3 text-gray-500" />
              <input
                type="email"
                className="bg-transparent outline-none w-full"
                value={email}
                disabled
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-400 text-sm">Phone</label>
            <div className="flex items-center bg-[#1f1f1f] p-3 mt-1 rounded-lg border border-transparent focus-within:border-yellow-500 transition">
              <FiPhone className="mr-3 text-gray-400" />
              <input
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-gray-400 text-sm">Address</label>
            <div className="flex items-start bg-[#1f1f1f] p-3 mt-1 rounded-lg border border-transparent focus-within:border-yellow-500 transition">
              <FiMapPin className="mr-3 text-gray-400 mt-1" />
              <textarea
                rows="2"
                className="bg-transparent outline-none w-full resize-none"
                placeholder="Full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* ========== Security Section ========== */}
          <h3 className="text-xl font-semibold text-yellow-400 mt-6 mb-3">
            Security
          </h3>

          {/* Password */}
          <div>
            <label className="text-gray-400 text-sm">New Password</label>
            <div className="flex items-center bg-[#1f1f1f] p-3 mt-1 rounded-lg border border-transparent focus-within:border-yellow-500 transition relative">
              <FiLock className="mr-3 text-gray-400" />
              <input
                type={showPass ? "text" : "password"}
                className="bg-transparent outline-none w-full"
                placeholder="Enter new password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="absolute right-4 cursor-pointer text-gray-300"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-500 py-3 rounded-lg text-black font-bold mt-4 hover:bg-yellow-600 transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
