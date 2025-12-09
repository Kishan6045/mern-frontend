import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../config";
import { useAuth } from "../../context/auth";
import { Select, ConfigProvider, theme } from "antd";
import AdminLayout from "../../components/Layout/AdminLayout";
const { Option } = Select;
export default function CreateProduct() {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subList, setSubList] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState([]);
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/category/get-category`);
        if (data.success) setCategories(data.category);
      } catch {
        toast.error("Error loading categories");
      }
    };
    loadCategories();
  }, []);
  const handleCategoryChange = (value) => {
    setCategory(value);
    const selected = categories.find((c) => c._id === value);
    setSubList(selected?.subcategories || []);
    setSubCategory("");
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!category) return toast.error("Please select a category");
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("description", description);
      fd.append("price", price);
      fd.append("quantity", quantity);
      fd.append("shipping", shipping);
      fd.append("category", category);
      fd.append("gender", gender);
      fd.append("type", type);
      photo.forEach((img) => fd.append("photos", img));
      if (subCategory) fd.append("subcategory", subCategory);
      const { data } = await axios.post(
        `${API}/api/v1/product/create-product`,
        fd,
        { headers: { Authorization: auth?.token } }
      );
      if (data.success) {
        toast.success("Product Created Successfully!");
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
        setPhoto([]);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-yellow-500 text-center mb-8">
        Create Product
      </h1>
      <ConfigProvider
        theme={{
          token: {
            colorTextPlaceholder: "#fff",
            colorText: "#fff",
          },
          algorithm: theme.darkAlgorithm,
          components: {
            Select: {
              colorTextPlaceholder: "#fff",
              colorText: "#fff",
              optionSelectedColor: "#ffd700",
              optionSelectedBg: "#2a2a2a",
            },
          },
        }}
      >
        <div
          className="p-8 rounded-xl shadow-xl max-w-2xl mx-auto"
          style={{
            background: "linear-gradient(145deg, #111, #1e1e1e)",
            border: "1px solid #2c2c2c",
            boxShadow: "0 0 20px rgba(212, 182, 90, 0.15)",
          }}
        >
          {/* ✅ REMOVED CUSTOM CSS - Using ConfigProvider theme instead for better dark mode support */}
          {/* CATEGORY */}
          <label className="text-[#d4b65a] text-sm mb-1 block">Select Category</label>
          <Select
            placeholder="Select a category"
            showSearch
            size="large"
            className="w-full mb-4"
            style={{
              backgroundColor: "#2a2a2a",
              border: "1px solid #d4b65a66",
              borderRadius: "10px",
              color: "#fff",
            }}
            dropdownStyle={{
              backgroundColor: "#2a2a2a",
              color: "#ffd700",
            }}
            value={category || undefined}
            onChange={handleCategoryChange}
          >
            {categories.map((c) => (
              <Option
                key={c._id}
                value={c._id}
                style={{ color: "#ffd700", backgroundColor: "#2a2a2a" }}
              >
                {c.name}
              </Option>
            ))}
          </Select>
          {/* SUBCATEGORY */}
          {subList.length > 0 && (
            <>
              <label className="text-[#d4b65a] text-sm mb-1 block">Select Subcategory</label>
              <Select
                placeholder="Select a subcategory"
                size="large"
                className="w-full mb-4"
                style={{
                  backgroundColor: "#2a2a2a",
                  border: "1px solid #d4b65a66",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                dropdownStyle={{
                  backgroundColor: "#2a2a2a",
                  color: "#ffd700",
                }}
                value={subCategory || undefined}
                onChange={(v) => setSubCategory(v)}
              >
                {subList.map((sub) => (
                  <Option
                    key={sub.slug}
                    value={sub.slug}
                    style={{ color: "#ffd700" }}
                  >
                    {sub.name}
                  </Option>
                ))}
              </Select>
            </>
          )}
          {/* SHIPPING */}
          <label className="text-[#d4b65a] text-sm mb-1 block">Shipping Available?</label>
          <Select
            placeholder="Shipping?"
            size="large"
            className="w-full mb-6"
            style={{
              backgroundColor: "#2a2a2a",
              border: "1px solid #d4b65a66",
              borderRadius: "10px",
              color: "#fff",
            }}
            dropdownStyle={{
              backgroundColor: "#2a2a2a",
              color: "#ffd700",
            }}
            value={shipping || undefined}
            onChange={(v) => setShipping(v)}
          >
            <Option value="1" style={{ color: "#ffd700" }}>Yes</Option>
            <Option value="0" style={{ color: "#ffd700" }}>No</Option>
          </Select>
          {/* OTHER FIELDS */}
          <label className="text-[#d4b65a] font-semibold mb-1 block">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-[#2a2a2a] text-yellow-300 p-3 rounded-lg border border-[#d4b65a66] mb-4"
          >
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
          <label className="text-[#d4b65a] font-semibold mb-1 block">Watch Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-[#2a2a2a] text-yellow-300 p-3 rounded-lg border border-[#d4b65a66] mb-4"
          >
            <option value="">Select Type</option>
            <option value="classic">Classic</option>
            <option value="smart">Smart</option>
          </select>
          <label className="text-[#d4b65a] text-sm">Upload Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setPhoto((prev) => [...prev, ...Array.from(e.target.files)])
            }
            className="w-full bg-[#2a2a2a] p-3 mb-4 rounded-lg text-yellow-300 border border-[#d4b65a66]"
          />
          {photo.length > 0 && (
  <div className="flex gap-3 flex-wrap mt-3">
    {photo.map((img, index) => (
      <div key={index} className="relative">
        
        {/* ❌ REMOVE BUTTON */}
        <button
          type="button"
          onClick={() =>
            setPhoto((prev) => prev.filter((_, i) => i !== index))
          }
          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg hover:bg-red-700"
        >
          ✕
        </button>

        {/* IMAGE PREVIEW */}
        <img
          src={URL.createObjectURL(img)}
          className="h-28 w-28 rounded-lg object-cover border border-yellow-600"
        />
      </div>
    ))}
  </div>
)}

          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#2a2a2a] text-yellow-300 p-3 mb-4 rounded-lg border border-[#d4b65a66]"
              required
            />
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#2a2a2a] text-yellow-300 p-3 mb-4 rounded-lg border border-[#d4b65a66] h-28"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#2a2a2a] text-yellow-300 p-3 mb-4 rounded-lg border border-[#d4b65a66]"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-[#2a2a2a] text-yellow-300 p-3 mb-4 rounded-lg border border-[#d4b65a66]"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 p-3 rounded-lg text-black font-bold shadow-lg"
            >
              Create Product
            </button>
          </form>
        </div>
      </ConfigProvider>
    </AdminLayout>
  );
}