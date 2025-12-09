// client/src/pages/admin/EditProduct.js

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import AdminLayout from "../../components/Layout/AdminLayout";

export default function EditProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [productId, setProductId] = useState("");
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");

  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deleteIndexes, setDeleteIndexes] = useState([]);

  const removeOldImage = (i) => {
    setDeleteIndexes((prev) => [...prev, i]);
  };

  const removeNewImage = (i) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== i));
  };

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      if (data.success) setCategories(data.category || []);
    } catch (error) {
      console.log("Category load error", error);
    }
  };

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/product/single-product/${slug}`
      );

      if (data.success) {
        const p = data.product;
        setProductId(p._id);
        setOldImages(p.images || []);

        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setQuantity(p.quantity);
        setCategory(p.category?._id || p.category);
        setShipping(p.shipping ? "1" : "0");
      }
    } catch (error) {
      console.log("Product load error", error);
      toast.error("Error loading product");
    }
  };

  useEffect(() => {
    loadCategories();
    loadProduct();
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("shipping", shipping === "1");

      formData.append("deleteIndexes", JSON.stringify(deleteIndexes));

      newImages.forEach((img) => {
        formData.append("photos", img);
      });

      const { data } = await axios.put(
        `${API}/api/v1/product/update-product/${productId}`,
        formData,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      if (data.success) {
        toast.success("Product updated successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.log("Update Error", error);
      toast.error("Error updating product");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        Edit Product
      </h1>

      <form
        onSubmit={handleUpdate}
        className="max-w-3xl mx-auto bg-[#141414] p-7 rounded-2xl shadow-xl border border-gray-800"
      >
        {/* PHOTOS */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-200 text-lg">
            Product Photos
          </label>

          <label className="bg-[#222] px-5 py-2 rounded-lg cursor-pointer border border-gray-700 hover:border-yellow-400 text-gray-300 mb-4 inline-block">
            Upload New Photos
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) =>
                setNewImages((prev) => [
                  ...prev,
                  ...Array.from(e.target.files),
                ])
              }
            />
          </label>

          <div className="flex flex-wrap gap-4">
            {/* OLD IMAGES */}
            {oldImages
              .filter((_, i) => !deleteIndexes.includes(i))
              .map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={`${API}/${img}`}
                    className="w-24 h-24 rounded-lg object-cover border border-gray-700"
                  />

                  <button
                    type="button"
                    onClick={() => removeOldImage(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}

            {/* NEW IMAGES */}
            {newImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  className="w-24 h-24 rounded-lg object-cover border border-gray-700"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* NAME */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-300">
            Name
          </label>
          <input
            type="text"
            className="w-full bg-[#1f1f1f] border border-gray-700 text-white p-3 rounded-lg focus:border-yellow-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-300">
            Description
          </label>
          <textarea
            className="w-full bg-[#1f1f1f] border border-gray-700 text-white p-3 rounded-lg focus:border-yellow-400 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        {/* PRICE + QUANTITY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-300">
              Price (₹)
            </label>
            <input
              type="number"
              className="w-full bg-[#1f1f1f] border border-gray-700 text-white p-3 rounded-lg focus:border-yellow-400 outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-300">
              Quantity
            </label>
            <input
              type="number"
              className="w-full bg-[#1f1f1f] border border-gray-700 text-white p-3 rounded-lg focus:border-yellow-400 outline-none"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORY + SHIPPING */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
          <div>
            <label className="block mb-2 font-semibold text-gray-300">
              Category
            </label>
            <select
              className="w-full bg-[#1f1f1f] border border-gray-700 text-white p-3 rounded-lg focus:border-yellow-400 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-300">
              Shipping
            </label>
            <select
              className="w-full bg-[#1f1f1f] border border-gray-700 text-white p-3 rounded-lg focus:border-yellow-400 outline-none"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl text-lg shadow-lg"
        >
          Update Product ✅
        </button>
      </form>
    </AdminLayout>
  );
}
