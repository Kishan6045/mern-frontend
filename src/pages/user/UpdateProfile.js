import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { API } from "../../config";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // Prefill from logged in user
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

    try {
      const { data } = await axios.put(
        `${API}/api/v1/auth/profile`,
        {
          name,
          email,
          age,
          phone,
          address,
          password: password || undefined, // optional
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("Profile updated");

        // update context + localStorage
        const newAuth = { ...auth, user: data.user };
        setAuth(newAuth);
        localStorage.setItem("auth", JSON.stringify(newAuth));
        setPassword("");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="pt-20 px-6 text-white bg-black min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-yellow-500 text-center">
          Update Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-[#1a1a1a] p-6 rounded-xl shadow-lg space-y-4"
        >
          <input
            type="text"
            className="w-full bg-[#222] p-3 rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full bg-[#222] p-3 rounded opacity-70 cursor-not-allowed"
            value={email}
            disabled
          />

          <input
            type="number"
            className="w-full bg-[#222] p-3 rounded"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="text"
            className="w-full bg-[#222] p-3 rounded"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            className="w-full bg-[#222] p-3 rounded"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-[#222] p-3 rounded"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Layout>
  );
}
