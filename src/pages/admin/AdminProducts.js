// client/src/pages/admin/AdminProducts.js

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../config";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

// Icons
import { FiTrash2, FiSearch, FiFilter, FiEdit2 } from "react-icons/fi";

export default function AdminProducts() {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-products`);
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.log("Error loading products", error);
      toast.error("Failed to load products");
    }
  };

  // LOAD CATEGORIES
  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category || []);
      }
    } catch (error) {
      console.log("Error loading categories", error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const { data } = await axios.delete(
        `${API}/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Product deleted");
        loadProducts();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.log("Delete error", error);
      toast.error("Error deleting product");
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "—";
  };

  const visibleProducts = products
    .filter((p) =>
      search.trim() === ""
        ? true
        : p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      categoryFilter === "all" ? true : p.category === categoryFilter
    );

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminMenu />

      <div className="flex-1 p-6 pt-20 bg-black">
        <h1 className="text-3xl font-bold text-yellow-500 text-center mb-6">
          Manage Products
        </h1>

        {/* Search + Filter */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl mb-6 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex items-center bg-[#222] px-3 py-2 rounded-lg w-full md:w-72">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-[#222] px-3 py-2 rounded-lg">
            <FiFilter className="text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent outline-none text-white"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-xl overflow-x-auto">
          {visibleProducts.length === 0 ? (
            <p className="text-center text-gray-400">
              No products found for current filters.
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#333] text-yellow-500">
                  <th className="p-3 border-b border-gray-700">Image</th>
                  <th className="p-3 border-b border-gray-700 text-left">Name</th>
                  <th className="p-3 border-b border-gray-700">Category</th>
                  <th className="p-3 border-b border-gray-700">Price</th>
                  <th className="p-3 border-b border-gray-700">Qty</th>
                  <th className="p-3 border-b border-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-[#2a2a2a]">
                    <td className="p-3 border-b border-gray-800 text-center">
                      <img
                        src={`${API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-md mx-auto"
                      />
                    </td>

                    <td className="p-3 border-b border-gray-800 text-left">
                      {p.name}
                    </td>

                    <td className="p-3 border-b border-gray-800 text-center">
                      {getCategoryName(p.category)}
                    </td>

                    <td className="p-3 border-b border-gray-800 text-center text-yellow-400 font-semibold">
                      ₹{p.price}
                    </td>

                    <td className="p-3 border-b border-gray-800 text-center">
                      {p.quantity}
                    </td>

                    <td className="p-3 border-b border-gray-800 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/admin/products/${p.slug}`)
                          }
                          className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
                        >
                          <FiEdit2 /> Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
