// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Header from "../../components/Layout/Header";
// import { useAuth } from "../../context/auth";
// import { useNavigate, Link } from "react-router-dom";
// import { FiMail, FiLock } from "react-icons/fi";
// import { API } from "../../config";


// const Login = () => {
//   const navigate = useNavigate();
//   const [auth, setAuth] = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${API}/api/v1/auth/login`, {
//         email,
//         password,
//       });

//       if (res.data.success) {
//         toast.success("Login Successful");

//         setAuth({
//           user: res.data.user,
//           token: res.data.token,
//         });

//         localStorage.setItem("auth", JSON.stringify(res.data));
//         navigate("/");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-black flex justify-center items-center px-4">
//         {/* CARD */}
//         <div className="bg-[#1b1b1b] p-8 rounded-xl w-full max-w-md shadow-xl">

//           {/* Heading */}
//           <h1 className="text-white text-3xl font-semibold mb-1 text-center">
//             Welcome Back
//           </h1>
//           <p className="text-gray-400 text-sm text-center mb-6">
//             Login to your account
//           </p>

//           {/* FORM */}
//           <form onSubmit={handleSubmit}>

//             {/* EMAIL FIELD */}
//             <label className="text-gray-300 text-sm">Email address</label>
//             <div className="relative mt-1 mb-4">
//               <FiMail className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="email"
//                 placeholder="your@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-[#111] text-white pl-10 p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-yellow-600 outline-none"
//               />
//             </div>

//             {/* PASSWORD FIELD */}
//             <label className="text-gray-300 text-sm">Password</label>
//             <div className="relative mt-1 mb-4">
//               <FiLock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-[#111] text-white pl-10 p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-yellow-600 outline-none"
//               />
//             </div>

//             {/* REMEMBER + FORGOT */}
//             <div className="flex justify-between text-sm text-gray-400 mb-4">
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" className="accent-yellow-600" />
//                 Remember this device
//               </label>
//               <Link to="/forgot-password" className="text-yellow-600 hover:underline">
//                 Forgot?
//               </Link>

//             </div>

//             {/* LOGIN BUTTON */}
//             <button
//               type="submit"
//               className="w-full bg-[#d4a056] text-black font-semibold p-3 rounded-md hover:bg-[#c9974d] transition"
//             >
//               LOG IN
//             </button>
//           </form>

//           {/* REGISTER LINK */}
//           <p className="text-gray-400 text-center text-sm mt-4">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-yellow-600 hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;















import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/Layout/Header";
import { useAuth } from "../../context/auth";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { API } from "../../config";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const GOOGLE_CLIENT_ID =
    "837081113402-pkvt25ksp19c0p7r1vne4alvu929hr6f.apps.googleusercontent.com";

  // --------------------------
  // LOAD GOOGLE LOGIN BUTTON
  // --------------------------
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginDiv"),
        {
          theme: "outline",
          size: "large",
          width: "260",
        }
      );
    }
  }, []);

  // -------------------------------------------------------------------
  // ⭐ GOOGLE LOGIN (ONLY IF USER ALREADY REGISTERED)
  // -------------------------------------------------------------------
  const handleGoogleResponse = async (response) => {
    try {
      const userObj = jwtDecode(response.credential);

      const res = await axios.post(`${API}/api/v1/auth/google-login`, {
        name: userObj.name,
        email: userObj.email,
        picture: userObj.picture,
      });

      // ❌ NOT REGISTERED EARLIER
      if (!res.data.success) {
        toast.error("Please register first using Email & Password.");
        return;
      }

      // ✔ LOGIN SUCCESS
      toast.success("Google Login Successful!");

      setAuth({
        user: res.data.user,
        token: res.data.token,
      });

      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");

    } catch (err) {
      console.log("GOOGLE LOGIN ERROR:", err);
      toast.error("Google Login Failed!");
    }
  };

  // -------------------------------------------------------------------
  // ⭐ NORMAL LOGIN
  // -------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Login Successful!");

        setAuth({
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-black flex justify-center items-center px-4">
        <div className="bg-[#1b1b1b] p-8 rounded-xl w-full max-w-md shadow-xl">

          <h1 className="text-white text-3xl font-semibold mb-1 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm text-center mb-6">
            Login to your account
          </p>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit}>
            <label className="text-gray-300 text-sm">Email address</label>
            <div className="relative mt-1 mb-4">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111] text-white pl-10 p-3 rounded-md border border-gray-700"
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
                className="w-full bg-[#111] text-white pl-10 p-3 rounded-md border border-gray-700"
              />
            </div>

            {/* ⭐ FORGOT PASSWORD LINK ⭐ */}
            <div className="flex justify-end text-sm text-gray-400 mb-4">
              <Link to="/forgot-password" className="text-yellow-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d4a056] text-black font-semibold p-3 rounded-md hover:bg-[#c9974d]"
            >
              LOG IN
            </button>
          </form>

          {/* GOOGLE LOGIN */}
          <div className="mt-5 flex justify-center">
            <div id="googleLoginDiv"></div>
          </div>

          <p className="text-gray-400 text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-yellow-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
