import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";
import { useState } from "react";
import DrawerMenu from "./DrawerMenu";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-black text-white px-4 py-3 flex items-center justify-between shadow-md fixed top-0 left-0 z-50">

        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button className="text-2xl" onClick={() => setOpen(true)}>
            <FiMenu />
          </button>

          <Link to="/" className="text-lg font-semibold tracking-wide text-yellow-500">
            WATCH STORE
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5 text-xl">
          <FiSearch />
          <Link to="/login"><FiUser /></Link>
          <Link to="/cart"><FiShoppingCart /></Link>
        </div>
      </header>

      {/* Drawer Menu */}
      <DrawerMenu open={open} setOpen={setOpen} />
    </>
  );
}

export default Header;
