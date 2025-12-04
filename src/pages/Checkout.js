import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import { API } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

export default function Checkout() {
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const [auth] = useAuth();   // ✅ FIX

  useEffect(() => {
    const p = localStorage.getItem("checkoutProduct");
    if (p) setProduct(JSON.parse(p));
  }, []);

  const handleOrder = async () => {
    if (!address) return alert("Enter address");
    if (!payment) return alert("Select payment");

    const finalData = {
      products: [product._id],
      payment: { method: payment, status: payment === "cod" ? "pending" : "paid" },
      amount: product.price,
      address,
    };

    try {
      const res = await axios.post(
        `${API}/api/v1/order/create-order`,
        finalData,
        {
          headers: {
            Authorization: auth?.token,  // ✅ AUTH FIXED
          },
        }
      );

      if (res.data.success) {
        localStorage.removeItem("checkoutProduct");
        navigate("/order-success");
      }
    } catch (error) {
      console.log("Order Error", error);
    }
  };


  return (
    <Layout>
      <div className="px-6 py-10 text-white bg-black min-h-screen">

        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Checkout</h1>

        {!product ? (
          <p className="text-center text-gray-400">No product selected for checkout.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {/* Product Summary */}
            <div className="md:col-span-1 bg-[#1e1e1e] p-5 rounded-lg shadow">
              <img
                src={`${API}/api/v1/product/product-photo/${product._id}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-yellow-500 text-lg font-bold">₹{product.price}</p>
            </div>

            {/* Checkout Form */}
            <div className="md:col-span-2 bg-[#1c1c1c] p-6 rounded-lg shadow">

              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

              <textarea
                className="w-full bg-[#222] text-white p-3 rounded-md mb-4"
                placeholder="Enter full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>

              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  Cash on Delivery (COD)
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  UPI / PhonePe / GPay
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  Debit / Credit Card
                </label>
              </div>

              <button
                onClick={handleOrder}
                className="w-full bg-yellow-500 text-black font-bold py-3 mt-6 rounded-lg hover:bg-yellow-600"
              >
                Place Order 🚀
              </button>

            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
