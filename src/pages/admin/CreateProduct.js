import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
import AdminLayout from "../../components/Layout/AdminLayout";

const { Option } = Select;

export default function CreateProduct() {
  const [auth] = useAuth();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subList, setSubList] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const [gender, setGender] = useState("");      // ⭐ NEW
  const [type, setType] = useState("");          // ⭐ NEW

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Load Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Category Change Handler
  const handleCategoryChange = (value) => {
    setCategory(value);
    const selectedCat = categories.find((c) => c._id === value);
    setSubList(selectedCat?.subcategories || []);
    setSubCategory("");
  };

  // Create Product Handler
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!category) return toast.error("Please select a category");

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      productData.append("gender", gender);       // ⭐ NEW
      productData.append("type", type);           // ⭐ NEW
      productData.append("photo", photo);

      if (subCategory) {
        productData.append("subcategory", subCategory);
      }

      const { data } = await axios.post(
        `${API}/api/v1/product/create-product`,
        productData,
        { headers: { Authorization: auth?.token } }
      );

      if (data.success) {
        toast.success("Product Created Successfully!");

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setShipping("");
        setCategory("");
        setSubList([]);
        setSubCategory("");
        setGender("");
        setType("");
        setPhoto("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AdminLayout>
        <h1 className="text-3xl font-bold text-yellow-500 text-center mb-8">
          Create Product
        </h1>

        <div className="p-8 bg-[#787373] rounded-xl shadow-xl max-w-2xl mx-auto border border-[#333]">

          {/* CATEGORY */}
          <label className="text-gray-300 text-sm">Select Category</label>
          <Select
            bordered={false}
            placeholder="Select a category"
            showSearch
            size="large"
            className="w-full mb-4 bg-[#222] text-white"
            dropdownStyle={{ backgroundColor: "#222", color: "white" }}
            value={category || undefined}
            onChange={handleCategoryChange}
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          {/* SUBCATEGORY */}
          {subList.length > 0 && (
            <>
              <label className="text-gray-300 text-sm">Select Subcategory</label>
              <Select
                bordered={false}
                placeholder="Select a subcategory"
                size="large"
                className="w-full mb-4 bg-[#222] text-white"
                dropdownStyle={{ backgroundColor: "#222", color: "white" }}
                value={subCategory || undefined}
                onChange={(val) => setSubCategory(val)}
              >
                {subList.map((sub) => (
                  <Option key={sub.slug} value={sub.slug}>
                    {sub.name}
                  </Option>
                ))}
              </Select>
            </>
          )}

          {/* GENDER (NEW) */}
          <div className="mb-4">
            <label className="text-yellow-500 font-semibold">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-[#222] p-2 text-white rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>

          {/* TYPE (NEW) */}
          <div className="mb-4">
            <label className="text-yellow-500 font-semibold">Watch Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-[#222] p-2 text-white rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="classic">Classic</option>
              <option value="smart">Smart</option>
            </select>
          </div>

          {/* PHOTO UPLOAD */}
          <label className="text-gray-300 text-sm">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full bg-[#222] p-3 mb-4 rounded-md text-white"
          />

          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="product"
              className="h-40 mx-auto mb-4 rounded-lg shadow-lg border border-[#444]"
            />
          )}

          {/* PRODUCT FORM */}
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#222] text-white p-3 mb-4 rounded-md"
              required
            />

            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#222] text-white p-3 mb-4 rounded-md h-28"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#222] text-white p-3 mb-4 rounded-md"
              required
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-[#222] text-white p-3 mb-4 rounded-md"
              required
            />

            <Select
              bordered={false}
              placeholder="Shipping?"
              size="large"
              className="w-full mb-6 bg-[#222] text-white"
              dropdownStyle={{ backgroundColor: "#222", color: "white" }}
              value={shipping || undefined}
              onChange={(val) => setShipping(val)}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 p-3 rounded-md text-black font-bold transition"
            >
              Create Product
            </button>
          </form>

        </div>
      </AdminLayout>
  );
}
