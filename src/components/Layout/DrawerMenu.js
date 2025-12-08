
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FiX,
//   FiChevronDown,
//   FiUser,
//   FiShoppingCart,
//   FiHeadphones,
// } from "react-icons/fi";
// import { useAuth } from "../../context/auth";
// import { API } from "../../config";

// function DrawerMenu({ open, setOpen }) {
//   const navigate = useNavigate();
//   const [auth, setAuth] = useAuth();
//   const [catOpen, setCatOpen] = useState(false);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     const { data } = await axios.get(`${API}/api/v1/category/get-category`);
//     setCategories(data.category || []);
//   };

//   const toggleSub = (index) => {
//     setCategories((prev) =>
//       prev.map((c, i) => (i === index ? { ...c, open: !c.open } : c))
//     );
//   };

//   const go = (url) => {
//     setOpen(false);
//     navigate(url);
//   };

//   const handleLogout = () => {
//     setAuth({ user: null, token: "" });
//     localStorage.removeItem("auth");
//     setOpen(false);
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* OVERLAY */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 transition duration-300 ${
//           open ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         onClick={() => setOpen(false)}
//       ></div>

//       {/* DRAWER */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-[#0d0d0d] text-white z-50 transform transition-transform duration-300 border-r border-yellow-500/20 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* HEADER */}
//         <div className="flex justify-between items-center px-5 py-4 border-b border-yellow-500/20 bg-[#111]">
//           <h1 className="text-lg font-bold text-yellow-500 tracking-wider">
//             WATCH STORE
//           </h1>

//           <FiX
//             className="text-2xl cursor-pointer hover:text-yellow-500 transition"
//             onClick={() => setOpen(false)}
//           />
//         </div>

//         {/* USER PROFILE BOX */}
//         {auth?.user ? (
//           <div className="px-5 py-4 border-b border-yellow-500/20 bg-[#141414]">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-yellow-500 text-black flex items-center justify-center rounded-full font-bold text-lg">
//                 {auth?.user?.name[0].toUpperCase()}
//               </div>

//               <div>
//                 <p className="text-lg font-semibold text-yellow-400">
//                   {auth?.user?.name}
//                 </p>
//                 <p className="text-gray-400 text-xs">{auth?.user?.email}</p>
//                 <button
//                   onClick={() => go("/dashboard/user/profile")}
//                   className="text-yellow-500 text-xs mt-1 underline"
//                 >
//                   View Account →
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="px-5 py-4 border-b border-yellow-500/20 bg-[#141414]">
//             <Link
//               to="/login"
//               className="block bg-yellow-500 text-black font-semibold text-center py-2 rounded-lg hover:bg-yellow-600 transition"
//               onClick={() => setOpen(false)}
//             >
//               Login / Register
//             </Link>
//           </div>
//         )}

//         {/* QUICK ACTIONS */}
//         {auth?.user && auth.user.role === 0 && (
//           <div className="px-5 py-4 border-b border-yellow-500/20 grid grid-cols-2 gap-4">
//             <button
//               onClick={() => go("/cart")}
//               className="bg-[#1b1b1b] p-3 rounded-lg flex flex-col items-center hover:bg-[#222] transition"
//             >
//               <FiShoppingCart className="text-xl text-yellow-500" />
//               <span className="text-sm mt-1">Cart</span>
//             </button>

//             <button
//               onClick={() => go("/dashboard/user/orders")}
//               className="bg-[#1b1b1b] p-3 rounded-lg flex flex-col items-center hover:bg-[#222] transition"
//             >
//               <FiUser className="text-xl text-yellow-500" />
//               <span className="text-sm mt-1">Orders</span>
//             </button>
//           </div>
//         )}

//         {/* MAIN MENU */}
//         <div className="px-6 mt-5 space-y-5 text-lg">
//           <Link
//             to="/"
//             onClick={() => setOpen(false)}
//             className="block hover:text-yellow-500 transition"
//           >
//             Home
//           </Link>

//           <button
//             onClick={() => go("/products")}
//             className="block hover:text-yellow-500 transition text-left w-full"
//           >
//             All Watches
//           </button>

//           {/* CATEGORY DROPDOWN */}
//           <div>
//             <div
//               className="flex justify-between items-center cursor-pointer hover:text-yellow-500 text-lg"
//               onClick={() => setCatOpen(!catOpen)}
//             >
//               <span>Categories</span>
//               <FiChevronDown
//                 className={`${catOpen ? "rotate-180" : ""} transition`}
//               />
//             </div>

//             {catOpen && (
//               <div className="ml-4 mt-3 space-y-3">
//                 {categories.map((cat, index) => (
//                   <div key={cat._id}>
//                     <div
//                       className="flex justify-between items-center cursor-pointer hover:text-yellow-500"
//                       onClick={() => toggleSub(index)}
//                     >
//                       <span>{cat.name}</span>
//                       <FiChevronDown
//                         className={`${cat.open ? "rotate-180" : ""} transition`}
//                       />
//                     </div>

//                     {cat.open && (
//                       <div className="ml-4 mt-2 space-y-2">
//                         {cat.subcategories?.map((sub) => (
//                           <button
//                             key={sub.slug}
//                             onClick={() =>
//                               go(`/products?category=${cat.slug}&sub=${sub.slug}`)
//                             }
//                             className="block text-left text-sm hover:text-yellow-400"
//                           >
//                             {sub.name}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ⭐⭐⭐ ADMIN SECTION (FULL FIXED) ⭐⭐⭐ */}
//       {auth?.user && auth.user.role === 1 && (
//   <div className="px-6 mt-6 space-y-4 border-t border-yellow-500/20 pt-4">

//     {/* CLICK → GO TO ADMIN DASHBOARD */}
//     <h3
//       className="text-yellow-400 text-sm font-semibold cursor-pointer hover:text-yellow-300 transition"
//       onClick={() => go("/dashboard/admin")}
//     >
//       ADMIN PANEL
//     </h3>

//   </div>
// )}


//         {/* FOOTER */}
//         <div className="absolute bottom-6 left-0 w-full px-6">
//           <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition">
//             <FiHeadphones className="text-xl" /> Help & Support
//           </button>

//           {auth?.user && (
//             <div
//               className="mt-4 w-full bg-red-500 text-center py-2 rounded-lg font-semibold cursor-pointer hover:bg-red-600 transition"
//               onClick={handleLogout}
//             >
//               Logout
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default DrawerMenu;








import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiX,
  FiChevronDown,
  FiUser,
  FiShoppingCart,
  FiHeadphones,
  FiHome,
  FiClock,
  FiGrid,
} from "react-icons/fi";
import { useAuth } from "../../context/auth";
import { API } from "../../config";

function DrawerMenu({ open, setOpen }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [catOpen, setCatOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await axios.get(`${API}/api/v1/category/get-category`);
    setCategories(data.category || []);
  };

  const toggleSub = (index) => {
    setCategories((prev) =>
      prev.map((c, i) => (i === index ? { ...c, open: !c.open } : c))
    );
  };

  const go = (url) => {
    setOpen(false);
    navigate(url);
  };

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#0d0d0d] text-white z-50 transform transition-transform duration-300 border-r border-yellow-500/20 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-yellow-500/20 bg-[#111]">
          <h1 className="text-lg font-bold text-yellow-500 tracking-wider">
            WATCH STORE
          </h1>

          <FiX
            className="text-2xl cursor-pointer hover:text-yellow-500 transition"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* USER BOX */}
        {auth?.user ? (
          <div className="px-5 py-4 border-b border-yellow-500/20 bg-[#141414]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xl font-bold shadow-md shadow-yellow-500/30">
                {auth.user.name[0].toUpperCase()}
              </div>

              <div>
                <p className="text-lg font-semibold text-yellow-400">
                  {auth.user.name}
                </p>
                <p className="text-gray-400 text-xs">{auth.user.email}</p>
                <button
                  onClick={() => go("/dashboard/user/profile")}
                  className="text-yellow-500 text-xs mt-1 underline"
                >
                  View Account →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-5 py-4 border-b border-yellow-500/20 bg-[#141414]">
            <Link
              to="/login"
              className="block bg-yellow-500 text-black font-semibold text-center py-2 rounded-lg hover:bg-yellow-600 transition"
              onClick={() => setOpen(false)}
            >
              Login / Register
            </Link>
          </div>
        )}

        {/* QUICK ACTIONS */}
        {auth?.user && auth.user.role === 0 && (
          <div className="px-5 py-4 border-b border-yellow-500/20 grid grid-cols-2 gap-4 bg-[#101010]">
            <button
              onClick={() => go("/cart")}
              className="bg-[#1b1b1b] hover:bg-[#242424] p-3 rounded-lg flex flex-col items-center transition"
            >
              <FiShoppingCart className="text-xl text-yellow-500" />
              <span className="text-sm mt-1">Cart</span>
            </button>

            <button
              onClick={() => go("/dashboard/user/orders")}
              className="bg-[#1b1b1b] hover:bg-[#242424] p-3 rounded-lg flex flex-col items-center transition"
            >
              <FiUser className="text-xl text-yellow-500" />
              <span className="text-sm mt-1">Orders</span>
            </button>
          </div>
        )}

        {/* MAIN MENU */}
        <div className="px-4 mt-6 space-y-1">

          {/* Home */}
          <button
            onClick={() => go("/")}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1b1b1b] transition text-left w-full"
          >
            <FiHome className="text-xl text-yellow-500" /> Home
          </button>

          {/* All Watches */}
          <button
            onClick={() => go("/products")}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1b1b1b] transition w-full text-left"
          >
            <FiClock className="text-xl text-yellow-500" /> All Watches
          </button>

          {/* Categories */}
          <div>
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#1b1b1b] rounded-md transition"
              onClick={() => setCatOpen(!catOpen)}
            >
              <div className="flex items-center gap-3">
                <FiGrid className="text-xl text-yellow-500" />
                <span>Categories</span>
              </div>
              <FiChevronDown
                className={`transition ${catOpen ? "rotate-180" : ""}`}
              />
            </div>

            {catOpen && (
              <div className="ml-10 mt-3 space-y-2">
                {categories.map((cat, index) => (
                  <div key={cat._id}>
                    <div
                      className="flex justify-between items-center cursor-pointer hover:text-yellow-400 transition"
                      onClick={() => toggleSub(index)}
                    >
                      {cat.name}
                      <FiChevronDown
                        className={`transition ${cat.open ? "rotate-180" : ""}`}
                      />
                    </div>

                    {cat.open && (
                      <div className="ml-3 mt-1 space-y-1">
                        {cat.subcategories?.map((sub) => (
                          <button
                            key={sub.slug}
                            onClick={() =>
                              go(`/products?category=${cat.slug}&sub=${sub.slug}`)
                            }
                            className="block text-left text-sm hover:text-yellow-400"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ADMIN */}
        {auth?.user && auth.user.role === 1 && (
          <div className="px-6 mt-6 border-t border-yellow-500/20 pt-4">
            <button
              onClick={() => go("/dashboard/admin")}
              className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 transition"
            >
              ADMIN PANEL
            </button>
          </div>
        )}

        {/* FOOTER */}
        <div className="absolute bottom-6 left-0 px-6 w-full">
          <button className="flex items-center gap-2 hover:text-yellow-500 transition">
            <FiHeadphones className="text-xl" /> Help & Support
          </button>

          {auth?.user && (
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 transition py-2 rounded-md font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default DrawerMenu;
