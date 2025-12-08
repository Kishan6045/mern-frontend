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

  const [photo, setPhoto] = useState(null);

  // Load categories
  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      if (data.success) setCategories(data.category || []);
    } catch (error) {
      console.log("Category load error", error);
    }
  };

  // Load product
  const loadProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/product/single-product/${slug}`
      );

      if (data.success) {
        const p = data.product;
        setProductId(p._id);
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setQuantity(p.quantity);
        setCategory(p.category?._id || p.category);
        setShipping(p.shipping ? "1" : "0");
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.log("Product load error", error);
      toast.error("Error loading product");
    }
  };

  useEffect(() => {
    loadCategories();
    loadProduct();
    // eslint-disable-next-line
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !quantity || !category) {
      return toast.error("All fields are required");
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("shipping", shipping === "1");

      if (photo) {
        formData.append("photo", photo);
      }

      const { data } = await axios.put(
        `${API}/api/v1/product/update-product/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Product updated");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.log("Update error", error);
      toast.error("Error updating product");
    }
  };

  return (
   <AdminLayout>
        <h1 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
          Edit Product
        </h1>

        <form
          onSubmit={handleUpdate}
          className="max-w-3xl mx-auto bg-[#1a1a1a] p-6 rounded-xl shadow-lg"
        >
          {/* Photo */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Product Photo</label>
            <div className="flex items-center gap-4">
              <label className="bg-gray-700 px-4 py-2 rounded cursor-pointer">
                {photo ? "Change Photo" : "Upload New Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>

              {/* Preview */}
              <div>
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : productId ? (
                  <img
                    src={`${API}/api/v1/product/product-photo/${productId}`}
                    alt="current"
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full bg-[#222] p-3 rounded outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              className="w-full bg-[#222] p-3 rounded outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            ></textarea>
          </div>

          {/* Price + Qty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold">Price (₹)</label>
              <input
                type="number"
                className="w-full bg-[#222] p-3 rounded outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Quantity</label>
              <input
                type="number"
                className="w-full bg-[#222] p-3 rounded outline-none"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          {/* Category + Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-1 font-semibold">Category</label>
              <select
                className="w-full bg-[#222] p-3 rounded outline-none"
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
              <label className="block mb-1 font-semibold">Shipping</label>
              <select
                className="w-full bg-[#222] p-3 rounded outline-none"
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
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600"
          >
            Update Product ✅
          </button>
        </form>
    </AdminLayout>
  );
}
