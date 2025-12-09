import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import AdminLayout from "../../components/Layout/AdminLayout";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [auth] = useAuth();

  // LOAD ALL CATEGORIES
  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // CREATE MAIN CATEGORY
  const handleMainCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/v1/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Category Created");
        setName("");
        loadCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error creating category");
    }
  };

  // ADD SUBCATEGORY
  const handleSubCategory = async (e) => {
    e.preventDefault();

    if (!selectedCategory) return toast.error("Select a category first");

    try {
      const res = await axios.post(
        `${API}/api/v1/category/add-sub`,
        {
          categoryId: selectedCategory,
          subName,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Subcategory Added");
        setSubName("");
        setSelectedCategory("");
        loadCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error adding subcategory");
    }
  };


return (
  <AdminLayout>
    <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">
      Manage Categories
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* ADD MAIN CATEGORY */}
      <div className="p-6 bg-[#0F0F0F] rounded-xl shadow-lg border border-[#333]">
        <h3 className="text-xl text-amber-300 mb-4">Add Main Category</h3>

        <form onSubmit={handleMainCategory}>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1A1A1A] text-white p-3 rounded mb-4 border border-[#333] focus:border-amber-400"
            placeholder="Enter Category Name"
          />

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 p-3 w-full rounded text-black font-bold transition"
          >
            Create
          </button>
        </form>
      </div>

      {/* ADD SUBCATEGORY */}
      <div className="p-6 bg-[#0F0F0F] rounded-xl shadow-lg border border-[#333]">
        <h3 className="text-xl text-amber-300 mb-4">Add Subcategory</h3>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full bg-[#1A1A1A] text-white p-3 rounded mb-4 border border-[#333] focus:border-amber-400"
        >
          <option value="">Select Main Category</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={subName}
          required
          onChange={(e) => setSubName(e.target.value)}
          className="w-full bg-[#1A1A1A] text-white p-3 rounded mb-4 border border-[#333] focus:border-amber-400"
          placeholder="Enter Subcategory Name"
        />

        <button
          onClick={handleSubCategory}
          className="bg-blue-600 hover:bg-blue-500 p-3 w-full rounded font-bold transition"
        >
          Add Subcategory
        </button>
      </div>
    </div>

    {/* SHOW ALL CATEGORIES */}
    <div className="mt-10 p-6 bg-[#0F0F0F] rounded-xl shadow-lg border border-[#333]">
      <h3 className="text-xl text-amber-300 mb-4">All Categories</h3>

      {categories.map((c) => (
        <div key={c._id} className="mb-4">
          <h4 className="text-lg font-bold text-amber-400">{c.name}</h4>

          {(!c.subcategories || c.subcategories.length === 0) ? (
            <p className="text-gray-500 ml-4">— No subcategories</p>
          ) : (
            <ul className="ml-4 list-disc text-gray-300">
              {c.subcategories.map((sub, index) => (
                <li key={index}>{sub.name}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </AdminLayout>
);

}
