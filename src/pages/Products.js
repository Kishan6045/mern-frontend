import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-products`);
      setProducts(data.products || []);
    } catch (err) {
      console.log("Error loading products");
    }
  };

  const addToCart = (p) => {
    const updatedCart = [...cart, p];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Watches</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-[#1e1e1e] p-4 rounded-lg shadow hover:scale-105 transition"
            >
              <img
                src={`${API}/api/v1/product/product-photo/${p._id}`}
                className="h-40 w-full object-cover rounded mb-3"
                alt={p.name}
              />

              <h3 className="text-white text-lg font-semibold">{p.name}</h3>
              <p className="text-yellow-500 font-bold mb-3">₹{p.price}</p>

              {/* Buttons */}
              <div className="flex flex-col space-y-3">

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(p)}
                  className="w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Add to Cart 🛒
                </button>

                {/* Buy Now */}
                <button
                  onClick={() => {
                    localStorage.setItem("checkoutProduct", JSON.stringify(p));
                    navigate("/checkout");
                  }}
                  className="w-full bg-[#333] text-white border border-yellow-500 py-2 rounded-lg hover:bg-[#444] transition"
                >
                  Buy Now ⚡
                </button>


              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
