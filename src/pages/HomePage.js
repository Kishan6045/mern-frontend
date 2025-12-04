// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Layout from "../components/Layout/Layout";
// import axios from "axios";
// import { API } from "../config";

// export default function HomePage() {
//   const navigate = useNavigate();

//   const [trending, setTrending] = useState([]);
//   const [newArrivals, setNewArrivals] = useState([]);

//   // LOAD TRENDING PRODUCTS
//   const loadTrending = async () => {
//     try {
//       const { data } = await axios.get(`${API}/api/v1/product/trending`);
//       if (data.success) setTrending(data.products);
//     } catch (err) {
//       console.log("Trending Error", err);
//     }
//   };

//   // LOAD NEW ARRIVALS
//   const loadNewArrivals = async () => {
//     try {
//       const { data } = await axios.get(`${API}/api/v1/product/get-products`);
//       if (data.success) setNewArrivals(data.products.slice(0, 4));
//     } catch (err) {
//       console.log("New Arrivals Error", err);
//     }
//   };

//   useEffect(() => {
//     loadTrending();
//     loadNewArrivals();
//   }, []);

//   return (
//     <Layout>
//       <div className="bg-[#0c0c0c] text-white min-h-screen">

//         {/* ⭐ HERO SECTION */}
//         <div
//           className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://watchcentre.com/cdn/shop/files/banner-luxury-watches.jpg?v=1699015021')",
//           }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-65"></div>

//           <div className="relative z-10 text-center max-w-3xl px-4">
//             <h1 className="text-4xl md:text-6xl font-bold text-yellow-500">
//               Premium Luxury Watches
//             </h1>
//             <p className="mt-4 text-gray-300 text-lg">
//               Exclusive men’s and women’s luxury timepieces.
//             </p>

//             <Link
//               to="/products"
//               className="inline-block mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 transition"
//             >
//               Shop Now
//             </Link>
//           </div>
//         </div>

//         {/* ⭐ SHOP BY CATEGORY */}
//         <div className="py-16 px-6 max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-yellow-500 text-center mb-10">
//             Shop by Category
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//             {/* Men's */}
//             <CategoryBox
//               onClick={() => navigate("/products?gender=men")}
//               img="https://m.media-amazon.com/images/I/712Zc24+5wL._AC_UL480_FMwebp_QL65_.jpg"
//               title="Men’s Watches"
//             />

//             {/* Women */}
//             <CategoryBox
//               onClick={() => navigate("/products?gender=women")}
//               img="https://m.media-amazon.com/images/I/71dNQWf9YWL._AC_UL480_FMwebp_QL65_.jpg"
//               title="Women’s Watches"
//             />

//             {/* Smart */}
//             <CategoryBox
//               onClick={() => navigate("/products?type=smart")}
//               img="https://m.media-amazon.com/images/I/61X91w7Y3xL._AC_UL480_FMwebp_QL65_.jpg"
//               title="Smart Watches"
//             />

//             {/* Classic */}
//             <CategoryBox
//               onClick={() => navigate("/products?type=classic")}
//               img="https://m.media-amazon.com/images/I/71KhLDaXVgL._AC_UL480_FMwebp_QL65_.jpg"
//               title="Classic Watches"
//             />
//           </div>
//         </div>

//         {/* ⭐ TRENDING PRODUCTS */}
//         <Section title="🔥 Trending Watches (Most Sold)">
//           <ProductGrid products={trending} />
//         </Section>

//         {/* ⭐ NEW ARRIVALS */}
//         <Section title="🌟 New Arrivals">
//           <ProductGrid products={newArrivals} small />
//         </Section>
//       </div>
//     </Layout>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function CategoryBox({ onClick, img, title }) {
//   return (
//     <div
//       onClick={onClick}
//       className="cursor-pointer bg-[#1a1a1a] p-5 rounded-xl hover:border-yellow-500 border border-transparent transition"
//     >
//       <img src={img} className="h-40 w-full object-cover rounded-md" alt="" />
//       <h3 className="text-lg mt-3 text-center font-semibold">{title}</h3>
//     </div>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <div className="py-16 px-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold text-yellow-500 text-center mb-10">
//         {title}
//       </h2>
//       {children}
//     </div>
//   );
// }

// function ProductGrid({ products, small }) {
//   return (
//     <div
//       className={`grid grid-cols-1 ${small ? "md:grid-cols-4" : "md:grid-cols-3"} gap-8`}
//     >
//       {products.map((p) => (
//         <div
//           key={p._id}
//           className="bg-[#1a1a1a] p-5 rounded-xl hover:border-yellow-500 border border-transparent transition"
//         >
//           <img
//             src={`${API}/api/v1/product/product-photo/${p._id}`}
//             className={`${small ? "h-40" : "h-52"} w-full object-cover rounded-md`}
//             alt={p.name}
//           />

//           <h3 className="text-xl mt-4 font-semibold">{p.name}</h3>
//           <p className="text-yellow-500 mt-1">₹{p.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
 










import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { API } from "../config";

export default function HomePage() {
  const navigate = useNavigate();

  const [trending, setTrending] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  // LOAD TRENDING
  const loadTrending = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/trending`);
      if (data.success) setTrending(data.products);
    } catch (err) {
      console.log("Trending Error", err);
    }
  };

  // LOAD NEW ARRIVALS
  const loadNewArrivals = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-products`);
      if (data.success) setNewArrivals(data.products.slice(0, 4));
    } catch (err) {
      console.log("New Arrivals Error", err);
    }
  };

  useEffect(() => {
    loadTrending();
    loadNewArrivals();
  }, []);

  return (
    <Layout>
      <div className="bg-[#0b0b0b] text-white min-h-screen">

        {/* ⭐ HERO SECTION */}
        <div
          className="relative h-[60vh] md:h-[75vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://watchcentre.com/cdn/shop/files/banner-luxury-watches.jpg?v=1699015021')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

          <div className="relative z-10 text-center max-w-3xl px-5 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-500 drop-shadow-md">
              Premium Luxury Watches
            </h1>
            <p className="mt-4 text-gray-300 text-lg md:text-xl tracking-wide">
              Crafted Elegance • Modern Precision • Timeless Design
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 px-10 py-3 bg-yellow-500 text-black text-lg font-bold rounded-full hover:bg-yellow-600 transition-all duration-300 shadow-xl"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* ⭐ SHOP BY CATEGORY */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="section-title">Shop by Category</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <CategoryBox
              onClick={() => navigate("/products?gender=men")}
              img="https://m.media-amazon.com/images/I/712Zc24+5wL._AC_UL480_FMwebp_QL65_.jpg"
              title="Men’s Watches"
            />

            <CategoryBox
              onClick={() => navigate("/products?gender=women")}
              img="https://m.media-amazon.com/images/I/71dNQWf9YWL._AC_UL480_FMwebp_QL65_.jpg"
              title="Women’s Watches"
            />

            <CategoryBox
              onClick={() => navigate("/products?type=smart")}
              img="https://m.media-amazon.com/images/I/61X91w7Y3xL._AC_UL480_FMwebp_QL65_.jpg"
              title="Smart Watches"
            />

            <CategoryBox
              onClick={() => navigate("/products?type=classic")}
              img="https://m.media-amazon.com/images/I/71KhLDaXVgL._AC_UL480_FMwebp_QL65_.jpg"
              title="Classic Watches"
            />
          </div>
        </section>

        {/* ⭐ TRENDING PRODUCTS */}
        <Section title="🔥 Trending Watches (Most Sold)">
          <ProductGrid products={trending} />
        </Section>

        {/* ⭐ NEW ARRIVALS */}
        <Section title="🌟 New Arrivals">
          <ProductGrid products={newArrivals} small />
        </Section>

      </div>
    </Layout>
  );
}

/* ---------------- COMPONENTS ---------------- */

function CategoryBox({ onClick, img, title }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-[#161616] p-5 rounded-xl border border-gray-800 hover:border-yellow-500 hover:scale-105 transition-all duration-300 shadow-lg"
    >
      <img
        src={img}
        className="h-40 sm:h-44 w-full object-cover rounded-md shadow-md"
        alt={title}
      />
      <h3 className="text-lg mt-3 text-center font-semibold tracking-wide">
        {title}
      </h3>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function ProductGrid({ products, small }) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 ${
        small ? "md:grid-cols-4" : "md:grid-cols-3"
      } gap-6 md:gap-8`}
    >
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-[#161616] p-4 rounded-xl hover:border-yellow-500 border border-gray-800 transition-all duration-300 hover:scale-[1.02] shadow-md"
        >
          <img
            src={`${API}/api/v1/product/product-photo/${p._id}`}
            className={`${small ? "h-40" : "h-52"} w-full object-cover rounded-md shadow`}
            alt={p.name}
          />

          <h3 className="text-lg mt-4 font-semibold">{p.name}</h3>
          <p className="text-yellow-500 mt-1 font-medium">₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}





