import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { API } from "../config";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";



import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaHeart, FaShoppingCart, FaArrowUp } from "react-icons/fa";
import { FiMessageCircle, FiX } from "react-icons/fi";

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
    img: "https://m.media-amazon.com/images/I/712Zc24+5wL._AC_UL480_FMwebp_QL65_.jpg",
    link: "/products?gender=men",
  },
  {
    title: "Women’s Watches",
    img: "https://m.media-amazon.com/images/I/71dNQWf9YWL._AC_UL480_FMwebp_QL65_.jpg",
    link: "/products?gender=women",
  },
  {
    title: "Smart Watches",
    img: "https://m.media-amazon.com/images/I/61X91w7Y3xL._AC_UL480_FMwebp_QL65_.jpg",
    link: "/products?type=smart",
  },
  {
    title: "Classic Watches",
    img: "https://m.media-amazon.com/images/I/71KhLDaXVgL._AC_UL480_FMwebp_QL65_.jpg",
    link: "/products?type=classic",
  },
];

const WHY_POINTS = [
  {
    title: "100% Original Watches",
    desc: "All products are authenticated and passed through quality checks.",
    icon: "✅",
  },
  {
    title: "Secure Payments",
    desc: "256-bit SSL encryption with trusted payment gateways.",
    icon: "🔒",
  },
  {
    title: "Fast & Free Delivery",
    desc: "Free shipping on eligible orders all over India.",
    icon: "🚚",
  },
  {
    title: "7-Day Easy Returns",
    desc: "Hassle-free returns with dedicated support team.",
    icon: "↩️",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Verma",
    text: "The watch quality is amazing. Feels like a 20k brand in under 5k. Packaging and delivery were top-notch.",
  },
  {
    name: "Simran Kaur",
    text: "Loved the women's rose gold watch. It perfectly matches my outfits and feels very premium.",
  },
  {
    name: "Ankit Sharma",
    text: "Got my order in 2 days. The strap finish and dial quality are far better than expected at this price.",
  },
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

  // ---------------------------------------------
  // ⭐ FIXED ADD TO CART FUNCTION
  // ---------------------------------------------
 const addToCart = (p) => {
  const minimal = {
    _id: p._id,
    name: p.name,
    price: p.price,
    qty: 1
  };

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


  // -------- TIMER FOR FLASH SALE --------
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

  // -------- LOAD DATA --------
  const loadTrending = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/trending`);
      if (data.success) setTrending(data.products || []);
    } catch (err) {
      console.log("Trending Error", err);
    }
  };

  const loadNewArrivals = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-products`);
      if (data.success) setNewArrivals((data.products || []).slice(0, 8));
    } catch (err) {
      console.log("New Arrivals Error", err);
    }
  };

  useEffect(() => {
    loadTrending();
    loadNewArrivals();
  }, []);

  // -------- SCROLL TOP BUTTON --------
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------- WISHLIST / QUICK VIEW --------
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const isInWishlist = (id) => wishlist.includes(id);

  const openQuickView = (p) => setQuickViewProduct(p);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <Layout>
      <div className="bg-[#050505] text-white min-h-screen">
        {/* 🔔 TOP BAR */}
        <div className="w-full bg-[#111] text-sm text-gray-300 py-2 px-4 flex justify-center md:justify-between items-center border-b border-yellow-500/20">
          <p className="text-center">
            💥 Winter Sale: Flat{" "}
            <span className="text-yellow-400 font-semibold">10% OFF</span> on
            orders above ₹1999
          </p>
          <p className="hidden md:block text-xs text-gray-400">
            🚚 Free shipping | 🔒 100% Secure Payments | 📞 24/7 Support
          </p>
        </div>

        {/* 🕰 HERO SLIDER */}
        <HeroSlider />

        {/* BRAND STRIP */}
        <BrandStrip />

        {/* FLASH SALE SECTION */}
        <section className="py-10 px-6 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-600/20 via-yellow-500/10 to-transparent border border-yellow-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                ⏳ Flash Sale is Live!
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                Limited-time discounts on select luxury watches. Hurry up before
                the time runs out.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="font-semibold text-lg">
                Ends in:{" "}
                <span className="text-yellow-400">
                  {formatTime(flashSaleTime)}
                </span>
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

        {/* TRENDING SLIDER */}
        <section className="py-10 px-6 max-w-6xl mx-auto">
          <SectionTitle>🔥 Trending Watches (Most Sold)</SectionTitle>

          {trending.length === 0 ? (
            <EmptyMessage text="No trending watches found yet." />
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2600 }}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-10"
            >
              {trending.map((p) => (
                <SwiperSlide key={p._id}>
                  <ProductCard
                    p={p}
                    isInWishlist={isInWishlist(p._id)}
                    onWishlistToggle={() => toggleWishlist(p._id)}
                    onAddToCart={() => addToCart(p)}
                    onQuickView={() => openQuickView(p)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>

        {/* FEATURED BRANDS STRIP */}
        <section className="py-6 bg-[#0a0a0a] border-y border-yellow-500/10">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xs text-gray-400 mb-3 tracking-[0.25em] uppercase">
              Featured Brands
            </p>
            <div className="flex gap-8 overflow-x-auto no-scrollbar py-2 justify-center">
              {BRANDS.map((b) => (
                <span
                  key={b}
                  className="text-gray-300 text-xs md:text-sm tracking-[0.2em] uppercase whitespace-nowrap opacity-70 hover:opacity-100 transition"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
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
              <div
                key={p.title}
                className="bg-[#111] p-5 rounded-xl border border-yellow-500/10 hover:border-yellow-500/60 transition"
              >
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

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop={true}
            spaceBetween={20}
          >
            {TESTIMONIALS.map((r, i) => (
              <SwiperSlide key={i}>
                <div className="bg-[#111] p-8 rounded-xl border border-yellow-500/20 text-center">
                  <p className="text-gray-200 italic mb-4">“{r.text}”</p>
                  <p className="font-semibold text-yellow-400">— {r.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* NEWSLETTER */}
        <Newsletter />

        {/* QUICK VIEW MODAL */}
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={closeQuickView}
            onAddToCart={addToCart}
          />
        )}

        {/* FLOATING BUTTONS */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
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

// ---------- SMALL COMPONENTS ----------

function HeroSlider() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 3500 }}
      pagination={{ clickable: true }}
      loop={true}
      className="h-[75vh]"
    >
      {HERO_SLIDES.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[75vh] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-4 text-gray-300 text-lg max-w-2xl">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 transition"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function BrandStrip() {
  return (
    <div className="bg-[#0b0b0b] py-4 border-y border-yellow-500/10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-gray-400 text-xs md:text-sm tracking-[0.2em] uppercase">
        {BRANDS.map((b) => (
          <span key={b} className="opacity-70 hover:opacity-100 transition">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-3xl font-bold text-yellow-500 text-center mb-8">
      {children}
    </h2>
  );
}

function CategoryCard({ img, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer rounded-xl overflow-hidden group"
    >
      <img
        src={img}
        alt={title}
        className="h-44 w-full object-cover group-hover:scale-110 transition"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition flex items-center justify-center">
        <p className="text-lg font-semibold text-white group-hover:text-yellow-400">
          {title}
        </p>
      </div>
    </div>
  );
}

function EmptyMessage({ text }) {
  return (
    <p className="text-center text-gray-400 bg-[#111] py-8 rounded-xl">
      {text}
    </p>
  );
}

function ProductCard({
  p,
  small,
  showNewBadge,
  isInWishlist,
  onWishlistToggle,
  onAddToCart,
  onQuickView,
}) {
  return (
    <div className="relative bg-[#111] p-4 rounded-xl border border-transparent hover:border-yellow-500 transition transform hover:-translate-y-1">
      {showNewBadge && (
        <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
          NEW
        </span>
      )}

      <button
        onClick={onWishlistToggle}
        className="absolute top-3 right-3 text-red-500 hover:scale-110 transition"
      >
        <FaHeart
          className={
            isInWishlist ? "fill-red-500" : "fill-transparent stroke-red-500"
          }
        />
      </button>

      <div
        className="overflow-hidden rounded-md cursor-pointer"
        onClick={onQuickView}
      >
        <img
          src={`${API}/api/v1/product/product-photo/${p._id}`}
          className={`${
            small ? "h-40" : "h-56"
          } w-full object-cover transform hover:scale-105 transition`}
          alt={p.name}
        />
      </div>

      <h3 className="text-lg mt-4 font-semibold line-clamp-1">{p.name}</h3>
      <p className="text-yellow-400 mt-1 text-base">₹{p.price}</p>

      <div className="mt-4 flex justify-between items-center text-sm">
        <button
          onClick={onAddToCart}
          className="px-3 py-1.5 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition flex items-center gap-1"
        >
          <FaShoppingCart /> <span>Add to Cart</span>
        </button>
        <button
          onClick={onQuickView}
          className="px-3 py-1.5 bg-transparent border border-gray-500 rounded hover:border-yellow-500 text-xs"
        >
          Quick View
        </button>
      </div>
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return alert("Please enter email");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setEmail("");
  };

  return (
    <section className="py-14 px-6 max-w-4xl mx-auto">
      <div className="bg-[#111] p-8 rounded-2xl border border-yellow-500/30 text-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-3">
          Stay Updated with New Launches
        </h2>
        <p className="text-gray-300 mb-6 text-sm md:text-base">
          Join our newsletter and be the first to know about new arrivals,
          exclusive offers, and special discounts.
        </p>

        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md bg-[#181818] border border-gray-600 text-white outline-none w-full md:w-72"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Subscribe
          </button>
        </div>

        {sent && (
          <p className="mt-3 text-green-400 text-sm">
            ✅ Subscribed successfully! (demo)
          </p>
        )}
      </div>
    </section>
  );
}

function QuickViewModal({ product, onClose, onAddToCart }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-[#111] max-w-2xl w-full rounded-2xl p-6 relative border border-yellow-500/40">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          <FiX size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-lg">
            <img
              src={`${API}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">
              {product.name}
            </h2>
            <p className="text-yellow-400 text-xl mb-2">₹{product.price}</p>
            {product.description && (
              <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                {product.description}
              </p>
            )}

            <p className="text-sm text-gray-400 mb-1">
              Category: {product.category?.name || "—"}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Stock: {product.quantity ?? "—"}
            </p>

            <button
              className="w-full px-5 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition flex items-center justify-center gap-2"
              onClick={() => onAddToCart(product)}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


