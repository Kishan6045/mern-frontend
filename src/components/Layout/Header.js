// import { Link } from "react-router-dom";
// import { FiSearch, FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";
// import { useState } from "react";
// import DrawerMenu from "./DrawerMenu";
// import { useCart } from "../../context/cart";   // ✅ Correct path

// function Header() {
//   const [open, setOpen] = useState(false);
//   const [cart] = useCart();

//   return (
//     <>
//       <header className="w-full bg-black text-white px-4 py-3 flex items-center justify-between shadow-md fixed top-0 left-0 z-50">

//         {/* Left: Menu + Logo */}
//         <div className="flex items-center gap-4">
//           <button className="text-2xl" onClick={() => setOpen(true)}>
//             <FiMenu />
//           </button>

//           <Link to="/" className="text-lg font-semibold tracking-wide text-yellow-500">
//             WATCH STORE
//           </Link>
//         </div>

//         {/* Right: Icons */}
//         <div className="flex items-center gap-5 text-xl">

//           <FiSearch />

//           <Link to="/login">
//             <FiUser />
//           </Link>

//           {/* CART WITH COUNT */}
//           <Link to="/cart" className="relative">
//             <FiShoppingCart />
//             {cart?.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </Link>

//         </div>
//       </header>

//       {/* Drawer Menu */}
//       <DrawerMenu open={open} setOpen={setOpen} />
//     </>
//   );
// }

// export default Header;











import { Link } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import DrawerMenu from "./DrawerMenu";
import { useCart } from "../../context/cart";

function Header() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cart] = useCart();

  // ⭐ Scroll Effect – Premium Header Shrink
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ⭐ TOP OFFER BAR (Free shipping + Offers + Support) */}
      <div className="w-full bg-[#111] text-gray-300 text-xs md:text-sm py-2 px-4 border-b border-yellow-500/20 flex items-center justify-between fixed top-0 left-0 z-50">

        {/* Left - Free Shipping */}
        <p className="hidden md:block">
          🚚 <span className="text-yellow-400">Free Shipping</span> above ₹999
        </p>

        {/* Middle - Animated offer */}
        <p className="text-yellow-400 font-semibold animate-pulse">
          ✨ Winter Sale | Extra 10% OFF – Code: <span className="text-white">WIN10</span>
        </p>

        {/* Right - Support */}
        <p className="hidden md:block">
          📞 24/7 Support • 🔒 Secure Payments
        </p>
      </div>

      {/* ⭐ MAIN HEADER */}
      <header
        className={`w-full px-4 py-3 flex items-center justify-between fixed left-0 z-40 transition-all border-b border-yellow-500/20
        ${scrolled ? "bg-black shadow-xl top-[32px]" : "bg-black/60 top-[32px] backdrop-blur-md"}
        `}
      >
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            className="text-2xl text-white hover:text-yellow-500 transition drop-shadow-[0_0_4px_black]"
            onClick={() => setOpen(true)}
          >
            <FiMenu />
          </button>

          <Link
            to="/"
            className="text-lg font-bold tracking-wide text-yellow-500 hover:text-yellow-400 transition drop-shadow-lg"
          >
            WATCH <span className="text-white">STORE</span>
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5 text-xl">

          {/* Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-white hover:text-yellow-500 transition drop-shadow-[0_0_4px_black]"
          >
            <FiSearch />
          </button>

          {/* User */}
          <Link
            to="/login"
            className="text-white hover:text-yellow-500 transition drop-shadow-[0_0_4px_black]"
          >
            <FiUser />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-white hover:text-yellow-500 transition drop-shadow-[0_0_4px_black]">
            <FiShoppingCart />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* ⭐ FULLSCREEN SEARCH OVERLAY */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center px-6">

          {/* Close Button */}
          <button
            onClick={() => setShowSearch(false)}
            className="absolute top-8 right-8 text-white text-3xl hover:text-yellow-500 transition"
          >
            <FiX />
          </button>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search watches..."
            className="w-full max-w-xl px-4 py-3 text-lg rounded-md bg-[#111] border border-yellow-500 text-white outline-none"
          />

          {/* Suggestions */}
          <p className="text-gray-400 text-sm mt-4">Popular: Titan • Rolex • Men • Smart • Fossil</p>
        </div>
      )}

      {/* Drawer Menu */}
      <DrawerMenu open={open} setOpen={setOpen} />
    </>
  );
}

export default Header;


