import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="bg-[#0c0c0c] text-white min-h-screen">

        {/* ⭐ HERO SECTION */}
        <div
          className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://watchcentre.com/cdn/shop/files/banner-luxury-watches.jpg?v=1699015021')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-65"></div>

          <div className="relative z-10 text-center max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-500">
              Premium Luxury Watches
            </h1>
            <p className="mt-4 text-gray-300 text-lg">
              Exclusive men’s and women’s luxury timepieces.
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* ⭐ FEATURED CATEGORIES */}
        <div className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-10">
            Featured Collections
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <Link
              to="/products?gender=men"
              className="bg-[#1a1a1a] p-5 rounded-xl hover:border-yellow-500 border border-transparent transition cursor-pointer"
            >
              <img
                src="https://m.media-amazon.com/images/I/712Zc24+5wL._AC_UL480_FMwebp_QL65_.jpg"
                className="h-40 w-full object-cover rounded-md"
                alt="Men"
              />
              <h3 className="text-lg mt-3 text-center font-semibold">Men’s Watches</h3>
            </Link>

            <Link
              to="/products?gender=women"
              className="bg-[#1a1a1a] p-5 rounded-xl hover:border-yellow-500 border border-transparent transition cursor-pointer"
            >
              <img
                src="https://m.media-amazon.com/images/I/71dNQWf9YWL._AC_UL480_FMwebp_QL65_.jpg"
                className="h-40 w-full object-cover rounded-md"
                alt="Women"
              />
              <h3 className="text-lg mt-3 text-center font-semibold">Women’s Watches</h3>
            </Link>

            <Link
              to="/products?type=smart"
              className="bg-[#1a1a1a] p-5 rounded-xl hover:border-yellow-500 border border-transparent transition cursor-pointer"
            >
              <img
                src="https://m.media-amazon.com/images/I/61X91w7Y3xL._AC_UL480_FMwebp_QL65_.jpg"
                className="h-40 w-full object-cover rounded-md"
                alt="Smart"
              />
              <h3 className="text-lg mt-3 text-center font-semibold">Smart Watches</h3>
            </Link>

            <Link
              to="/products?type=classic"
              className="bg-[#1a1a1a] p-5 rounded-xl hover:border-yellow-500 border border-transparent transition cursor-pointer"
            >
              <img
                src="https://m.media-amazon.com/images/I/71KhLDaXVgL._AC_UL480_FMwebp_QL65_.jpg"
                className="h-40 w-full object-cover rounded-md"
                alt="Classic"
              />
              <h3 className="text-lg mt-3 text-center font-semibold">Classic Watches</h3>
            </Link>

          </div>
        </div>

        {/* ⭐ BEST SELLERS */}
        <div className="py-16 bg-[#111] px-6">
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-10">
            Best Sellers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {[
              {
                img: "https://m.media-amazon.com/images/I/71i68ZYB2AL._AC_UL480_FMwebp_QL65_.jpg",
                name: "Rolex Submariner",
                price: "₹1,25,000",
              },
              {
                img: "https://m.media-amazon.com/images/I/71jtGXy4V9L._AC_UL480_FMwebp_QL65_.jpg",
                name: "Omega Seamaster",
                price: "₹95,000",
              },
              {
                img: "https://m.media-amazon.com/images/I/81tShwXO8OL._AC_UL480_FMwebp_QL65_.jpg",
                name: "Fossil Chronograph",
                price: "₹18,999",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] p-5 rounded-xl hover:border-yellow-500 border border-transparent transition"
              >
                <img
                  src={item.img}
                  className="h-52 w-full object-cover rounded-md"
                  alt=""
                />
                <h3 className="text-xl mt-4 font-semibold">{item.name}</h3>
                <p className="text-yellow-500 mt-1">{item.price}</p>
                <Link
                  to="/products"
                  className="block mt-4 bg-yellow-500 text-black p-2 text-center rounded-md font-bold hover:bg-yellow-600 transition"
                >
                  Buy Now
                </Link>
              </div>
            ))}

          </div>
        </div>

        {/* ⭐ NEW ARRIVALS */}
        <div className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-10">
            New Arrivals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-[#1a1a1a] p-5 rounded-xl hover:border-yellow-500 border border-transparent transition"
              >
                <img
                  src="https://m.media-amazon.com/images/I/71KhLDaXVgL._AC_UL480_FMwebp_QL65_.jpg"
                  className="h-40 w-full object-cover rounded-md"
                  alt=""
                />
                <h3 className="mt-3 text-lg font-semibold">Premium Watch</h3>
                <p className="text-yellow-500">₹49,999</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
