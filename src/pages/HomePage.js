import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { API } from "../config";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

// IMPORT HOME COMPONENTS
import HeroSlider from "../components/Home/HeroSlider";
import BrandStrip from "../components/Home/BrandStrip";
import SectionTitle from "../components/Home/SectionTitle";
import CategoryCard from "../components/Home/CategoryCard";
import EmptyMessage from "../components/Home/EmptyMessage";
import ProductCard from "../components/Home/ProductCard";
import Newsletter from "../components/Home/Newsletter";
import QuickViewModal from "../components/Home/QuickViewModal";

import { FaArrowUp } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

// ---------- STATIC DATA ----------
const HERO_SLIDES = [
  {
    img: "https://watchcentre.com/cdn/shop/files/banner-luxury-watches.jpg?v=1699015021",
    title: "Timeless Luxury, Crafted for You",
    subtitle: "Premium watches that define your personality and status.",
    cta: "Explore Collection",
    link: "/products",
  },
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    title: "Smart Meets Stylish",
    subtitle: "Elegant smartwatches with advanced health & call features.",
    cta: "Shop Smart Watches",
    link: "/products?type=smart",
  },
  {
    img: "https://wallpaperaccess.com/full/38136.jpg",
    title: "Exclusive Men’s Collection",
    subtitle: "Bold, classic, and powerful designs for modern men.",
    cta: "Shop Men",
    link: "/products?gender=men",
  },
  {
    img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    title: "Luxury for Every Occasion",
    subtitle: "From office to party, find a watch for every moment.",
    cta: "Discover More",
    link: "/products",
  },
];

const CATEGORIES = [
  {
    title: "Men’s Watches",
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
    link: "/products?gender=men",
  },
  {
    title: "Women’s Watches",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    link: "/products?gender=women",
  },
  {
    title: "Smart Watches",
    img: "https://images.unsplash.com/photo-1544117519-31a4b719223d",
    link: "/products?type=smart",
  },
  {
    title: "Classic Watches",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    link: "/products?type=classic",
  },
];




const WHY_POINTS = [
  { title: "100% Original Watches", desc: "All products are authenticated and passed through quality checks.", icon: "✅" },
  { title: "Secure Payments", desc: "256-bit SSL encryption with trusted payment gateways.", icon: "🔒" },
  { title: "Fast & Free Delivery", desc: "Free shipping on eligible orders all over India.", icon: "🚚" },
  { title: "7-Day Easy Returns", desc: "Hassle-free returns with dedicated support team.", icon: "↩️" },
];

const TESTIMONIALS = [
  { name: "Rahul Verma", text: "The watch quality is amazing. Feels like a 20k brand in under 5k. Delivery was top-notch." },
  { name: "Simran Kaur", text: "Loved the rose gold watch. It perfectly matches my outfits!" },
  { name: "Ankit Sharma", text: "Got my order in 2 days. Strap quality is premium." },
];

const BRANDS = ["ROLEX", "OMEGA", "TITAN", "CASIO", "FOSSIL", "SEIKO", "CITIZEN"];

export default function HomePage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [trending, setTrending] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  const [flashSaleTime, setFlashSaleTime] = useState(3600);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // ⭐ ADD TO CART
  const addToCart = (p) => {
    const minimal = { _id: p._id, name: p.name, price: p.price, qty: 1 };
    const existing = cart.find((item) => item._id === p._id);

    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === p._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...cart, minimal];
    }
    setCart(updatedCart);
    toast.success("Added to cart");
  };

  // FLASH SALE TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashSaleTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, "0")}h : ${m
      .toString()
      .padStart(2, "0")}m : ${s.toString().padStart(2, "0")}s`;
  };

  // LOAD DATA
  useEffect(() => {
    const loadTrending = async () => {
      const { data } = await axios.get(`${API}/api/v1/product/trending`);
      if (data.success) setTrending(data.products || []);
    };

    const loadNewArrivals = async () => {
      const { data } = await axios.get(`${API}/api/v1/product/get-products`);
      if (data.success) setNewArrivals((data.products || []).slice(0, 8));
    };

    loadTrending();
    loadNewArrivals();
  }, []);

  // SCROLL TOP BUTTON
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openQuickView = (p) => setQuickViewProduct(p);
  const closeQuickView = () => setQuickViewProduct(null);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const isInWishlist = (id) => wishlist.includes(id);

  return (
    <Layout>
      <div className="bg-[#050505] text-white min-h-screen">

        {/* HERO SLIDER */}
        <HeroSlider HERO_SLIDES={HERO_SLIDES} />

        {/* BRANDS */}
        <BrandStrip BRANDS={BRANDS} />

        {/* FLASH SALE */}
        <section className="py-10 px-6 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-600/20 via-yellow-500/10 to-transparent border border-yellow-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">⏳ Flash Sale is Live!</h2>
              <p className="text-gray-300 text-sm md:text-base">Limited-time discounts on select luxury watches.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="font-semibold text-lg">
                Ends in: <span className="text-yellow-400">{formatTime(flashSaleTime)}</span>
              </p>
              <button
                onClick={() => navigate("/products?tag=flash-sale")}
                className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition"
              >
                View Flash Deals
              </button>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-10 px-6 max-w-6xl mx-auto">
          <SectionTitle>Shop by Category</SectionTitle>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.title}
                title={cat.title}
                img={cat.img}
                onClick={() => navigate(cat.link)}
              />

            ))}
          </div>
        </section>

        {/* TRENDING */}
        <section className="py-10 px-6 max-w-6xl mx-auto">
          <SectionTitle>🔥 Trending Watches (Most Sold)</SectionTitle>

          {trending.length === 0 ? (
            <EmptyMessage text="No trending watches found yet." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.map((p) => (
                <ProductCard
                  key={p._id}
                  p={p}
                  isInWishlist={isInWishlist(p._id)}
                  onWishlistToggle={() => toggleWishlist(p._id)}
                  onAddToCart={() => addToCart(p)}
                  onQuickView={() => openQuickView(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* NEW ARRIVALS */}
        <section className="py-10 px-6 max-w-6xl mx-auto">
          <SectionTitle>🌟 New Arrivals</SectionTitle>

          {newArrivals.length === 0 ? (
            <EmptyMessage text="No new arrivals yet." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((p) => (
                <ProductCard
                  key={p._id}
                  p={p}
                  small
                  showNewBadge
                  isInWishlist={isInWishlist(p._id)}
                  onWishlistToggle={() => toggleWishlist(p._id)}
                  onAddToCart={() => addToCart(p)}
                  onQuickView={() => openQuickView(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-12 px-6 max-w-6xl mx-auto">
          <SectionTitle>Why Choose Our Store?</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {WHY_POINTS.map((p) => (
              <div key={p.title} className="bg-[#111] p-5 rounded-xl border border-yellow-500/10 hover:border-yellow-500/60 transition">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-300">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12 px-6 max-w-4xl mx-auto">
          <SectionTitle>What Our Customers Say</SectionTitle>

          <div className="grid gap-6">
            {TESTIMONIALS.map((r, i) => (
              <div key={i} className="bg-[#111] p-8 rounded-xl border border-yellow-500/20 text-center">
                <p className="text-gray-200 italic mb-4">“{r.text}”</p>
                <p className="font-semibold text-yellow-400">— {r.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <Newsletter />

        {/* QUICK VIEW MODAL */}
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={closeQuickView}
            onAddToCart={addToCart}
            cart={cart}
            setCart={setCart}
          />
        )}

        {/* FLOATING BUTTONS */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-5 bg-yellow-500 text-black p-3 rounded-full shadow-lg hover:bg-yellow-600 transition z-40"
          >
            <FaArrowUp />
          </button>
        )}

        <button
          onClick={() => alert("Chat support coming soon (demo)!")}
          className="fixed bottom-5 right-5 bg-[#111] border border-yellow-500 text-yellow-400 p-3 rounded-full shadow-lg hover:bg-yellow-600 hover:text-black transition flex items-center justify-center z-40"
        >
          <FiMessageCircle size={20} />
        </button>

      </div>
    </Layout>
  );
}

















