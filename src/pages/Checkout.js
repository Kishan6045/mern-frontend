import Layout from "../components/Layout/Layout";
import { useEffect, useMemo, useState } from "react";
import { API } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  // Coupon States
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  // Load Checkout Data
  useEffect(() => {
    const single = localStorage.getItem("checkoutProduct");
    const many = localStorage.getItem("checkoutCart");

    if (single) {
      setProducts([JSON.parse(single)]);
    } else if (many) {
      setProducts(JSON.parse(many));
    }
  }, []);

  // Correct Total Amount (includes quantity)
  const totalAmount = useMemo(
    () => products.reduce((sum, p) => sum + p.price * (p.qty || 1), 0),
    [products]
  );

  // Update final amount when total or discount changes
  useEffect(() => {
    setFinalAmount(totalAmount - discount);
  }, [totalAmount, discount]);

  // APPLY COUPON
  const applyCoupon = async () => {
    if (!couponCode) return toast.error("Enter coupon");

    try {
      const { data } = await axios.post(`${API}/api/v1/coupon/apply`, {
        code: couponCode,
        amount: totalAmount,
      });

      if (data.success) {
        setDiscount(data.discount);
        setFinalAmount(data.finalAmount);
        toast.success("Coupon applied");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Coupon error");
    }
  };

  // Place Order
  const handleOrder = async () => {
    if (!address) return toast.error("Enter address");
    if (!payment) return toast.error("Select payment");
    if (!products.length) return toast.error("No products to checkout");

    const finalData = {
      products: products.map((p) => p._id),
      payment: {
        method: payment,
        status: payment === "cod" ? "pending" : "paid",
      },
      amount: finalAmount, // 👈 FINAL AMOUNT WITH DISCOUNT
      address,
      coupon: couponCode || null,
      discount,
    };

    try {
      const res = await axios.post(
        `${API}/api/v1/order/create-order`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res.data.success) {
        localStorage.removeItem("checkoutProduct");
        localStorage.removeItem("checkoutCart");

        // Clean cart
        setCart([]);
        localStorage.removeItem("cart");

        navigate("/order-success");
      } else {
        toast.error(res.data.message || "Order failed");
      }
    } catch (error) {
      console.log("Order Error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="px-6 py-10 text-white bg-black min-h-screen pt-20">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Checkout</h1>

        {!products.length ? (
          <p className="text-center text-gray-400">
            No product selected for checkout.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Product Summary */}
            <div className="md:col-span-1 space-y-4">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="bg-[#1e1e1e] p-5 rounded-lg shadow"
                >
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                    alt={p.name}
                  />

                  <h2 className="text-lg font-bold">{p.name}</h2>

                  <p className="text-yellow-500 font-bold">
                    ₹{p.price} × {p.qty || 1}
                  </p>
                </div>
              ))}

              {/* Price Summary with Coupon */}
              <div className="bg-[#1e1e1e] p-4 rounded-lg mt-2">

                {/* Coupon Input */}
                <div className="flex gap-2 mb-3">
                  <input
                    className="flex-1 bg-[#222] text-white p-2 rounded"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-yellow-500 text-black px-4 rounded"
                  >
                    Apply
                  </button>
                </div>

                {/* Show discount */}
                <p className="text-sm text-gray-300">
                  Discount:{" "}
                  <span className="text-yellow-500">₹{discount}</span>
                </p>

                {/* Total amount */}
                <p className="text-lg font-semibold mt-2">
                  Payable:{" "}
                  <span className="text-yellow-500">
                    ₹{finalAmount}
                  </span>
                </p>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="md:col-span-2 bg-[#1c1c1c] p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Delivery Information
              </h2>

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
                  UPI / PhonePe / GPay (dummy for now)
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  Debit / Credit Card (dummy for now)
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
