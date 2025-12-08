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

  // ⭐ Scroll Effect – Premium Shrink (NO top change)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ⭐ TOP SLIDING OFFER BAR */}
      <div className="w-full bg-[#111] text-gray-300 text-xs md:text-sm py-[2px] 
  border-b border-yellow-500/10 fixed top-0 left-0 z-50 overflow-hidden leading-none">

        <div className="animate-slide whitespace-nowrap text-center font-semibold text-yellow-400 leading-none">
          <span className="mx-6">🚚 Free Shipping above ₹999</span>
          <span className="mx-6">✨ Sale • Extra 50% OFF</span>
          <span className="mx-6">🔒 Secure Payments</span>
          <span className="mx-6">📞 24/7 Support</span>
        </div>

      </div>

      {/* ⭐ MAIN HEADER */}
      <header
        className={`
    w-full px-4 py-3 flex items-center justify-between 
    fixed left-0 top-[16px] z-40 transition-all border-b border-yellow-500/20
    ${scrolled ? "bg-black shadow-xl" : "bg-black/60 backdrop-blur-md"}
  `}
      >

        {/* Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            className="text-2xl text-white hover:text-yellow-500 transition"
            onClick={() => setOpen(true)}
          >
            <FiMenu />
          </button>

          <Link
            to="/"
            className="text-lg font-bold tracking-wide text-yellow-500 hover:text-yellow-400 transition"
          >
            WATCH <span className="text-white">STORE</span>
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 text-xl">

          {/* Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-white hover:text-yellow-500 transition"
          >
            <FiSearch />
          </button>

          {/* User */}
          <Link
            to="/login"
            className="text-white hover:text-yellow-500 transition"
          >
            <FiUser />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-white hover:text-yellow-500 transition">
            <FiShoppingCart />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black 
                text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* ⭐ FULLSCREEN SEARCH OVERLAY */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 
          flex flex-col items-center justify-center px-6">

          <button
            onClick={() => setShowSearch(false)}
            className="absolute top-8 right-8 text-white text-3xl hover:text-yellow-500 transition"
          >
            <FiX />
          </button>

          <input
            type="text"
            placeholder="Search watches..."
            className="w-full max-w-xl px-4 py-3 text-lg rounded-md bg-[#111] 
              border border-yellow-500 text-white outline-none"
          />

          <p className="text-gray-400 text-sm mt-4">
            Popular: Titan • Rolex • Men • Smart • Fossil
          </p>
        </div>
      )}

      {/* Drawer */}
      <DrawerMenu open={open} setOpen={setOpen} />
    </>
  );
}

export default Header;
