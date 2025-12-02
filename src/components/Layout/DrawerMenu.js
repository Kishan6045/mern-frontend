import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX, FiChevronDown, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/auth";

function DrawerMenu({ open, setOpen }) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [catOpen, setCatOpen] = useState(false);
  const [menOpen, setMenOpen] = useState(false);
  const [womenOpen, setWomenOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    setOpen(false);
    navigate("/login");
  };

  const go = (url) => {
    setOpen(false);
    navigate(url);
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#111] text-white z-50 
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-yellow-500">Menu</h2>
          <FiX className="text-2xl cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {/* CONTENT */}
        <div className="px-6 mt-4 space-y-5">

          {/* Home */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-500 text-lg"
          >
            Home
          </Link>

          {/* Categories */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer hover:text-yellow-500 text-lg"
              onClick={() => setCatOpen(!catOpen)}
            >
              <span>Categories</span>
              <FiChevronDown className={`${catOpen ? "rotate-180" : ""} transition`} />
            </div>

            {catOpen && (
              <div className="ml-4 mt-2 space-y-3">

                {/* Men */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer hover:text-yellow-500"
                    onClick={() => setMenOpen(!menOpen)}
                  >
                    <span>Men</span>
                    <FiChevronDown
                      className={`${menOpen ? "rotate-180" : ""} transition`}
                    />
                  </div>

                  {menOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <button
                        onClick={() => go("/products?gender=men&type=classic")}
                        className="block text-left hover:text-yellow-500"
                      >
                        Classic Watch
                      </button>
                      <button
                        onClick={() => go("/products?gender=men&type=smart")}
                        className="block text-left hover:text-yellow-500"
                      >
                        Smart Watch
                      </button>
                    </div>
                  )}
                </div>

                {/* Women */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer hover:text-yellow-500"
                    onClick={() => setWomenOpen(!womenOpen)}
                  >
                    <span>Women</span>
                    <FiChevronDown
                      className={`${womenOpen ? "rotate-180" : ""} transition`}
                    />
                  </div>

                  {womenOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <button
                        onClick={() => go("/products?gender=women&type=classic")}
                        className="block text-left hover:text-yellow-500"
                      >
                        Classic Watch
                      </button>
                      <button
                        onClick={() => go("/products?gender=women&type=smart")}
                        className="block text-left hover:text-yellow-500"
                      >
                        Smart Watch
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-500 text-lg"
          >
            Cart
          </Link>

          {/* USER ONLY */}
          {auth?.user && auth.user.role === 0 && (
            <>
              <Link
                to="/dashboard/user/orders"
                onClick={() => setOpen(false)}
                className="block hover:text-yellow-500 text-lg"
              >
                My Orders
              </Link>

              <Link
                to="/dashboard/user/profile"
                onClick={() => setOpen(false)}
                className="block hover:text-yellow-500 text-lg"
              >
                Update Profile
              </Link>
            </>
          )}

          {/* ADMIN ONLY */}
          {auth?.user && auth.user.role === 1 && (
            <>
              <Link
                to="/dashboard/admin"
                onClick={() => setOpen(false)}
                className="block hover:text-yellow-500 text-lg"
              >
                Admin Panel
              </Link>

              <Link
                to="/dashboard/admin/orders"
                onClick={() => setOpen(false)}
                className="block hover:text-yellow-500 text-lg"
              >
                All Orders
              </Link>
            </>
          )}

          {/* Login */}
          {!auth?.user && (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block hover:text-yellow-500 text-lg"
            >
              Login
            </Link>
          )}

        </div>

        {/* LOGOUT */}
        {auth?.user && (
          <div
            className="absolute bottom-6 left-6 flex items-center gap-3 text-red-400 cursor-pointer hover:text-red-500"
            onClick={handleLogout}
          >
            <FiLogOut className="text-2xl" />
            <span className="text-lg">Logout</span>
          </div>
        )}

      </div>
    </>
  );
}

export default DrawerMenu;
