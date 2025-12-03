import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API } from "../config";
import Layout from "../components/Layout/Layout";

export default function Products() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const category = query.get("category");
  const sub = query.get("sub");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [category, sub]);

  const loadProducts = async () => {
    try {
      let url = `${API}/api/v1/product/get-products`;

      if (category || sub) {
        url = `${API}/api/v1/product/filter-products?`;

        if (category) url += `category=${category}&`;
        if (sub) url += `sub=${sub}`;
      }

      const { data } = await axios.get(url);
      setProducts(data.products || []);
    } catch (err) {
      console.log("Error loading products");
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Products</h1>

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

              <h3 className="text-white text-lg">{p.name}</h3>
              <p className="text-yellow-500 font-bold">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
