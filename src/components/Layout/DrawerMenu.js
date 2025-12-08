// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { FiX, FiChevronDown, FiLogOut } from "react-icons/fi";
// // import { useAuth } from "../../context/auth";

// // function DrawerMenu({ open, setOpen }) {
// //   const [auth, setAuth] = useAuth();
// //   const navigate = useNavigate();

// //   const [catOpen, setCatOpen] = useState(false);
// //   const [menOpen, setMenOpen] = useState(false);
// //   const [womenOpen, setWomenOpen] = useState(false);

// //   const handleLogout = () => {
// //     setAuth({ user: null, token: "" });
// //     localStorage.removeItem("auth");
// //     setOpen(false);
// //     navigate("/login");
// //   };

// //   const go = (url) => {
// //     setOpen(false);
// //     navigate(url);
// //   };

// //   return (
// //     <>
// //       {/* Background Overlay */}
// //       <div
// //         className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-all duration-300
// //         ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
// //         onClick={() => setOpen(false)}
// //       ></div>

// //       {/* Drawer */}
// //       <div
// //         className={`fixed top-0 left-0 h-full w-72 bg-[#111] text-white z-50 
// //         transform transition-transform duration-300
// //         ${open ? "translate-x-0" : "-translate-x-full"}`}
// //       >
// //         {/* Header */}
// //         <div className="flex justify-between items-center px-5 py-4 border-b border-gray-800">
// //           <h2 className="text-xl font-semibold text-yellow-500">Menu</h2>
// //           <FiX className="text-2xl cursor-pointer" onClick={() => setOpen(false)} />
// //         </div>

// //         {/* CONTENT */}
// //         <div className="px-6 mt-4 space-y-5">

// //           {/* Home */}
// //           <Link
// //             to="/"
// //             onClick={() => setOpen(false)}
// //             className="block hover:text-yellow-500 text-lg"
// //           >
// //             Home
// //           </Link>

// //           {/* Categories */}
// //           <div>
// //             <div
// //               className="flex justify-between items-center cursor-pointer hover:text-yellow-500 text-lg"
// //               onClick={() => setCatOpen(!catOpen)}
// //             >
// //               <span>Categories</span>
// //               <FiChevronDown className={`${catOpen ? "rotate-180" : ""} transition`} />
// //             </div>

// //             {catOpen && (
// //               <div className="ml-4 mt-2 space-y-3">

// //                 {/* Men */}
// //                 <div>
// //                   <div
// //                     className="flex justify-between items-center cursor-pointer hover:text-yellow-500"
// //                     onClick={() => setMenOpen(!menOpen)}
// //                   >
// //                     <span>Men</span>
// //                     <FiChevronDown
// //                       className={`${menOpen ? "rotate-180" : ""} transition`}
// //                     />
// //                   </div>

// //                   {menOpen && (
// //                     <div className="ml-4 mt-2 space-y-2">
// //                       <button
// //                         onClick={() => go("/products?gender=men&type=classic")}
// //                         className="block text-left hover:text-yellow-500"
// //                       >
// //                         Classic Watch
// //                       </button>
// //                       <button
// //                         onClick={() => go("/products?gender=men&type=smart")}
// //                         className="block text-left hover:text-yellow-500"
// //                       >
// //                         Smart Watch
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Women */}
// //                 <div>
// //                   <div
// //                     className="flex justify-between items-center cursor-pointer hover:text-yellow-500"
// //                     onClick={() => setWomenOpen(!womenOpen)}
// //                   >
// //                     <span>Women</span>
// //                     <FiChevronDown
// //                       className={`${womenOpen ? "rotate-180" : ""} transition`}
// //                     />
// //                   </div>

// //                   {womenOpen && (
// //                     <div className="ml-4 mt-2 space-y-2">
// //                       <button
// //                         onClick={() => go("/products?gender=women&type=classic")}
// //                         className="block text-left hover:text-yellow-500"
// //                       >
// //                         Classic Watch
// //                       </button>
// //                       <button
// //                         onClick={() => go("/products?gender=women&type=smart")}
// //                         className="block text-left hover:text-yellow-500"
// //                       >
// //                         Smart Watch
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Cart */}
// //           <Link
// //             to="/cart"
// //             onClick={() => setOpen(false)}
// //             className="block hover:text-yellow-500 text-lg"
// //           >
// //             Cart
// //           </Link>

// //           {/* USER ONLY */}
// //           {auth?.user && auth.user.role === 0 && (
// //             <>
// //               <Link
// //                 to="/dashboard/user/orders"
// //                 onClick={() => setOpen(false)}
// //                 className="block hover:text-yellow-500 text-lg"
// //               >
// //                 My Orders
// //               </Link>

// //               <Link
// //                 to="/dashboard/user/profile"
// //                 onClick={() => setOpen(false)}
// //                 className="block hover:text-yellow-500 text-lg"
// //               >
// //                 Update Profile
// //               </Link>
// //             </>
// //           )}

// //           {/* ADMIN ONLY */}
// //           {auth?.user && auth.user.role === 1 && (
// //             <>
// //               <Link
// //                 to="/dashboard/admin"
// //                 onClick={() => setOpen(false)}
// //                 className="block hover:text-yellow-500 text-lg"
// //               >
// //                 Admin Panel
// //               </Link>

// //               <Link
// //                 to="/dashboard/admin/orders"
// //                 onClick={() => setOpen(false)}
// //                 className="block hover:text-yellow-500 text-lg"
// //               >
// //                 All Orders
// //               </Link>
// //             </>
// //           )}

// //           {/* Login */}
// //           {!auth?.user && (
// //             <Link
// //               to="/login"
// //               onClick={() => setOpen(false)}
// //               className="block hover:text-yellow-500 text-lg"
// //             >
// //               Login
// //             </Link>
// //           )}

// //         </div>

// //         {/* LOGOUT */}
// //         {auth?.user && (
// //           <div
// //             className="absolute bottom-6 left-6 flex items-center gap-3 text-red-400 cursor-pointer hover:text-red-500"
// //             onClick={handleLogout}
// //           >
// //             <FiLogOut className="text-2xl" />
// //             <span className="text-lg">Logout</span>
// //           </div>
// //         )}

// //       </div>
// //     </>
// //   );
// // }

// // export default DrawerMenu;


// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FiX, FiChevronDown, FiLogOut } from "react-icons/fi";
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

//  const loadCategories = async () => {
//   const { data } = await axios.get(`${API}/api/v1/category/get-category`);  // ✅ FIXED
//   setCategories(data.category || []);
// };

//   const toggleSub = (index) => {
//     setCategories((prev) =>
//       prev.map((c, i) =>
//         i === index ? { ...c, open: !c.open } : c
//       )
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
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
//           }`}
//         onClick={() => setOpen(false)}
//       ></div>

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-[#111] text-white z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center px-5 py-4 border-b border-gray-800">
//           <h2 className="text-xl font-semibold text-yellow-500">Menu</h2>
//           <FiX className="text-2xl cursor-pointer" onClick={() => setOpen(false)} />
//         </div>

//         {/* Content */}
//         <div className="px-6 mt-4 space-y-5">

//           {/* Home */}
//           <Link
//             to="/"
//             className="block hover:text-yellow-500 text-lg"
//             onClick={() => setOpen(false)}
//           >
//             Home
//           </Link>


//           {/* Watches */}
//           <button
//             onClick={() => go("/products")}
//             className="block hover:text-yellow-500 text-lg text-left w-full"
//           >
//             Watches
//           </button>


//           {/* Categories */}
//           <div>
//             <div
//               className="flex justify-between items-center cursor-pointer hover:text-yellow-500 text-lg"
//               onClick={() => setCatOpen(!catOpen)}
//             >
//               <span>Categories</span>
//               <FiChevronDown className={`${catOpen ? "rotate-180" : ""} transition`} />
//             </div>

//             {/* Dropdown container */}
//             {catOpen && (
//               <div className="ml-4 mt-3 space-y-3">

//                 {categories.map((cat, index) => (
//                   <div key={cat._id}>
//                     {/* Main Category */}
//                     <div
//                       className="flex justify-between items-center cursor-pointer hover:text-yellow-500"
//                       onClick={() => toggleSub(index)}
//                     >
//                       <span>{cat.name}</span>
//                       <FiChevronDown
//                         className={`${cat.open ? "rotate-180" : ""} transition`}
//                       />
//                     </div>

//                     {/* Subcategories */}
//                     {cat.open && (
//                       <div className="ml-4 mt-2 space-y-2">
//                         {cat.subcategories?.map((sub) => (
//                           <button
//                             key={sub.slug}
//                             onClick={() =>
//                               go(`/products?category=${cat.slug}&sub=${sub.slug}`)
//                             }
//                             className="block text-left hover:text-yellow-500"
//                           >
//                             {sub.name}
//                           </button>
//                         ))}

//                         {!cat.subcategories?.length && (
//                           <p className="text-gray-400 text-sm">No subcategories</p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}

//               </div>
//             )}
//           </div>

//           {/* Cart */}
//           <Link
//             to="/cart"
//             className="block hover:text-yellow-500 text-lg"
//             onClick={() => setOpen(false)}
//           >
//             Cart
//           </Link>

//           {/* User menu */}
//           {auth?.user && auth.user.role === 0 && (
//             <>
//               <Link
//                 to="/dashboard/user/orders"
//                 className="block hover:text-yellow-500 text-lg"
//                 onClick={() => setOpen(false)}
//               >
//                 My Orders
//               </Link>

//               <Link
//                 to="/dashboard/user/profile"
//                 className="block hover:text-yellow-500 text-lg"
//                 onClick={() => setOpen(false)}
//               >
//                 Update Profile
//               </Link>
//             </>
//           )}

//           {/* Admin menu */}
//           {auth?.user && auth.user.role === 1 && (
//             <>
//               <Link
//                 to="/dashboard/admin"
//                 className="block hover:text-yellow-500 text-lg"
//                 onClick={() => setOpen(false)}
//               >
//                 Admin Panel
//               </Link>

//               <Link
//                 to="/dashboard/admin/orders"
//                 className="block hover:text-yellow-500 text-lg"
//                 onClick={() => setOpen(false)}
//               >
//                 All Orders
//               </Link>
//             </>
//           )}

//           {/* Login */}
//           {!auth?.user && (
//             <Link
//               to="/login"
//               onClick={() => setOpen(false)}
//               className="block hover:text-yellow-500 text-lg"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Logout */}
//         {auth?.user && (
//           <div
//             className="absolute bottom-6 left-6 flex items-center gap-3 text-red-400 cursor-pointer hover:text-red-500"
//             onClick={handleLogout}
//           >
//             <FiLogOut className="text-2xl" />
//             <span className="text-lg">Logout</span>
//           </div>
//         )}
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
        className={`fixed inset-0 bg-black/50 z-40 transition duration-300 ${
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

        {/* USER PROFILE BOX */}
        {auth?.user ? (
          <div className="px-5 py-4 border-b border-yellow-500/20 bg-[#141414]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500 text-black flex items-center justify-center rounded-full font-bold text-lg">
                {auth?.user?.name[0].toUpperCase()}
              </div>

              <div>
                <p className="text-lg font-semibold text-yellow-400">
                  {auth?.user?.name}
                </p>
                <p className="text-gray-400 text-xs">{auth?.user?.email}</p>
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
          <div className="px-5 py-4 border-b border-yellow-500/20 grid grid-cols-2 gap-4">
            <button
              onClick={() => go("/cart")}
              className="bg-[#1b1b1b] p-3 rounded-lg flex flex-col items-center hover:bg-[#222] transition"
            >
              <FiShoppingCart className="text-xl text-yellow-500" />
              <span className="text-sm mt-1">Cart</span>
            </button>

            <button
              onClick={() => go("/dashboard/user/orders")}
              className="bg-[#1b1b1b] p-3 rounded-lg flex flex-col items-center hover:bg-[#222] transition"
            >
              <FiUser className="text-xl text-yellow-500" />
              <span className="text-sm mt-1">Orders</span>
            </button>
          </div>
        )}

        {/* MAIN MENU */}
        <div className="px-6 mt-5 space-y-5 text-lg">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-500 transition"
          >
            Home
          </Link>

          <button
            onClick={() => go("/products")}
            className="block hover:text-yellow-500 transition text-left w-full"
          >
            All Watches
          </button>

          {/* CATEGORY DROPDOWN */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer hover:text-yellow-500 text-lg"
              onClick={() => setCatOpen(!catOpen)}
            >
              <span>Categories</span>
              <FiChevronDown
                className={`${catOpen ? "rotate-180" : ""} transition`}
              />
            </div>

            {catOpen && (
              <div className="ml-4 mt-3 space-y-3">
                {categories.map((cat, index) => (
                  <div key={cat._id}>
                    <div
                      className="flex justify-between items-center cursor-pointer hover:text-yellow-500"
                      onClick={() => toggleSub(index)}
                    >
                      <span>{cat.name}</span>
                      <FiChevronDown
                        className={`${cat.open ? "rotate-180" : ""} transition`}
                      />
                    </div>

                    {cat.open && (
                      <div className="ml-4 mt-2 space-y-2">
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

        {/* ⭐⭐⭐ ADMIN SECTION (FULL FIXED) ⭐⭐⭐ */}
      {auth?.user && auth.user.role === 1 && (
  <div className="px-6 mt-6 space-y-4 border-t border-yellow-500/20 pt-4">

    {/* CLICK → GO TO ADMIN DASHBOARD */}
    <h3
      className="text-yellow-400 text-sm font-semibold cursor-pointer hover:text-yellow-300 transition"
      onClick={() => go("/dashboard/admin")}
    >
      ADMIN PANEL
    </h3>

  </div>
)}


        {/* FOOTER */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition">
            <FiHeadphones className="text-xl" /> Help & Support
          </button>

          {auth?.user && (
            <div
              className="mt-4 w-full bg-red-500 text-center py-2 rounded-lg font-semibold cursor-pointer hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DrawerMenu;
