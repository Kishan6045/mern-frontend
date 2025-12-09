import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { API } from "../config";
import { useCart } from "../context/cart";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [cart, setCart] = useCart();

  // ⭐ Add to Cart — Prevent Duplicate + Increase Qty
  const addToCart = () => {
    const existing = cart.find((item) => item._id === product._id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart"); // Direct Cart Page
  };

  // ⭐ Load Product Data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/product/single-product/${slug}`
        );
        if (data.success) setProduct(data.product);
      } catch (err) {
        console.log("Product load error", err);
      }
    };

    loadProduct();
  }, [slug]);

  // ⭐ Loading
  if (!product) return <Layout>Loading...</Layout>;

  // ⭐ Check Existing Qty
  const existing = cart.find((item) => item._id === product._id);
  const qty = existing ? existing.qty : 0;

  const images = product.images || [];

  return (
    <Layout>
      <div className="p-8 pt-28 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 animate-fadeIn">

        {/* LEFT IMAGE SECTION */}
        <div className="space-y-5">

          {/* MAIN IMAGE BOX */}
          <div
            className="relative bg-[#111] bg-opacity-80 backdrop-blur-xl 
                       border border-yellow-500/40 rounded-2xl 
                       p-5 shadow-[0_0_30px_rgba(255,215,0,0.15)]
                       transition-all duration-300 group hover:shadow-[0_0_50px_rgba(255,215,0,0.25)]"
          >
            <img
              src={`${API}/api/v1/product/product-photo/${product._id}?index=${activeIndex}`}
              className={`w-full h-[480px] object-contain rounded-xl transition-all duration-300 
                         ${zoom ? "scale-110" : "scale-100"}`}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              alt="product"
            />

            {/* LEFT ARROW */}
            {activeIndex > 0 && (
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 
                           bg-black/70 text-white px-4 py-2 rounded-full 
                           hover:bg-yellow-500 hover:text-black transition"
                onClick={() => setActiveIndex(activeIndex - 1)}
              >
                ◀
              </button>
            )}

            {/* RIGHT ARROW */}
            {activeIndex < images.length - 1 && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 
                           bg-black/70 text-white px-4 py-2 rounded-full 
                           hover:bg-yellow-500 hover:text-black transition"
                onClick={() => setActiveIndex(activeIndex + 1)}
              >
                ▶
              </button>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 mt-3 overflow-x-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={`${API}/api/v1/product/product-photo/${product._id}?index=${i}`}
                onClick={() => setActiveIndex(i)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all 
                  ${activeIndex === i
                    ? "border-yellow-500 scale-110 shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                    : "border-gray-700 opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT PRODUCT DETAILS */}
        <div className="text-white space-y-6 animate-slideUp">

          <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
            {product.name}
          </h1>

          <p className="text-yellow-300 text-4xl font-bold drop-shadow-md">
            ₹{product.price}
          </p>

          <p className="text-gray-300 text-lg leading-relaxed tracking-wide">
            {product.description}
          </p>

          {/* ⭐ Dynamic Button: If already in cart, show qty */}
          {qty === 0 ? (
            <button
              onClick={addToCart}
              className="bg-yellow-500 text-black px-10 py-4 rounded-xl 
                         font-bold text-xl flex items-center gap-3 
                         hover:bg-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.4)]
                         transition-all hover:scale-105 active:scale-95"
            >
              <FaShoppingCart size={22} /> Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-5">
              <span className="text-yellow-400 font-bold text-2xl">
                In Cart (Qty: {qty})
              </span>

              <button
                onClick={() => navigate("/cart")}
                className="bg-black border border-yellow-500 text-yellow-400 
                           px-8 py-3 rounded-xl font-semibold 
                           hover:bg-yellow-500 hover:text-black transition-all"
              >
                Go to Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
