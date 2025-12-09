import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

// Icons
import { FaShoppingCart } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";   
import { useAuth } from "../context/auth";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { search: queryString } = useLocation();
  const [auth] = useAuth();

  const [wishlistIds, setWishlistIds] = useState([]);

  const query = new URLSearchParams(queryString);
  const gender = query.get("gender");
  const type = query.get("type");

  /* =============================== LOAD PRODUCTS =============================== */
  useEffect(() => {
    loadProducts();
  }, [gender, type]);

  const loadProducts = async () => {
    try {
      let url = `${API}/api/v1/product/get-products?`;
      if (gender) url += `gender=${gender}&`;
      if (type) url += `type=${type}&`;

      const { data } = await axios.get(url);
      setProducts(data.products || []);
    } catch (err) {
      console.log("Error loading products");
    }
  };

  /* =============================== LOAD WISHLIST =============================== */
  useEffect(() => {
    const loadWishlist = async () => {
      if (!auth?.token) return;

      try {
        const { data } = await axios.get(`${API}/api/v1/auth/my-wishlist`, {
          headers: { Authorization: auth.token },
        });

        if (data.success) {
          setWishlistIds(data.products.map((p) => p._id));
        }
      } catch (err) {
        console.log("Wishlist Load Error");
      }
    };

    loadWishlist();
  }, [auth?.token]);

  /* =============================== TOGGLE WISHLIST ❤️ =============================== */
  const toggleWishlist = async (id) => {
    if (!auth?.token) return toast.error("Login required");

    try {
      await axios.post(
        `${API}/api/v1/auth/toggle-wishlist/${id}`,
        {},
        { headers: { Authorization: auth.token } }
      );

      if (wishlistIds.includes(id)) {
        setWishlistIds(wishlistIds.filter((x) => x !== id));
      } else {
        setWishlistIds([...wishlistIds, id]);
      }
    } catch (error) {
      toast.error("Error updating wishlist");
    }
  };

  /* =============================== ADD TO CART =============================== */
  const addToCart = (p) => {
    const existing = cart.find((item) => item._id === p._id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === p._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...p, qty: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart");
  };

 /* =============================== BUY NOW =============================== */
const handleBuyNow = (p) => {
  // Clear cart-based checkout
  localStorage.removeItem("cartCheckout");

  // Buy now always 1 quantity (best UX)
  const checkoutProduct = { ...p, qty: 1 };

  localStorage.setItem("checkoutProduct", JSON.stringify(checkoutProduct));

  navigate("/checkout");
};


  /* =============================== SEARCH FILTER =============================== */
  const filteredProducts = products.filter((p) =>
    search.trim() === ""
      ? true
      : p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 pt-20 min-h-screen bg-black">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-yellow-500">Premium Watches</h1>

          <input
            type="text"
            placeholder="Search watches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg w-full md:w-64 
                      border border-[#333] focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {filteredProducts.map((p) => {
            const existing = cart.find((item) => item._id === p._id);
            const qty = existing ? existing.qty : 0;

            return (
              <div
                key={p._id}
                className="bg-[#1e1e1e] p-4 rounded-lg shadow hover:scale-105 transition transform border 
                           border-transparent hover:border-yellow-500 relative"
              >
                {/* ❤️ WISHLIST BUTTON */}
                <button
                  onClick={() => toggleWishlist(p._id)}
                  className="absolute top-2 right-2 bg-black/50 rounded-full p-2 z-10"
                >
                  {wishlistIds.includes(p._id) ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-white text-xl" />
                  )}
                </button>

                <div onClick={() => navigate(`/product/${p.slug}`)} className="cursor-pointer">
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    className="h-40 w-full object-cover rounded mb-3"
                    alt={p.name}
                  />
                </div>

                <h3 className="text-white text-lg font-semibold line-clamp-1">{p.name}</h3>
                <p className="text-yellow-500 font-bold mb-3">₹{p.price}</p>

                <div className="flex flex-col space-y-3">

                  {/* ⭐ — ADD TO CART or – qty + UI here */}
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 
                                 transition flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between border border-yellow-500 
                                    rounded-lg px-3 py-2 bg-black">
                      
                      {/* – BUTTON */}
                      <button
                        onClick={() => {
                          const updated =
                            qty === 1
                              ? cart.filter((item) => item._id !== p._id)
                              : cart.map((item) =>
                                  item._id === p._id
                                    ? { ...item, qty: item.qty - 1 }
                                    : item
                                );

                          setCart(updated);
                          localStorage.setItem("cart", JSON.stringify(updated));
                        }}
                        className="bg-gray-800 text-white px-3 py-1 rounded-full text-lg hover:bg-gray-700"
                      >
                        –
                      </button>

                      {/* QTY */}
                      <span className="text-yellow-400 font-bold text-lg">{qty}</span>

                      {/* + BUTTON */}
                      <button
                        onClick={() => addToCart(p)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded-full text-lg hover:bg-yellow-400"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {/* BUY NOW */}
                  <button
                    onClick={() => handleBuyNow(p)}
                    className="w-full bg-[#333] text-white border border-yellow-500 py-2 rounded-lg 
                               hover:bg-[#444] transition flex items-center justify-center gap-2"
                  >
                    <BsLightningChargeFill className="text-yellow-400" />
                    Buy Now
                  </button>

                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <p className="text-gray-400 col-span-full text-center mt-10">
              No watches found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
