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
  const [giftMessage, setGiftMessage] = useState("");
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const [savedAddresses, setSavedAddresses] = useState([]);

  // Load Data
  useEffect(() => {
    const single = localStorage.getItem("checkoutProduct");
    const many = localStorage.getItem("checkoutCart");

    if (single) setProducts([JSON.parse(single)]);
    else if (many) setProducts(JSON.parse(many));

    const saved = localStorage.getItem("savedAddresses");
    if (saved) setSavedAddresses(JSON.parse(saved));

    if (auth?.user?.address) setAddress(auth.user.address);
  }, [auth?.user]);

  // Total
  const totalAmount = useMemo(
    () => products.reduce((sum, p) => sum + p.price * (p.qty || 1), 0),
    [products]
  );

  const FREE_SHIP_LIMIT = 999;
  const deliveryCharge = totalAmount >= FREE_SHIP_LIMIT ? 0 : 49;

  useEffect(() => {
    setFinalAmount(totalAmount - discount);
  }, [discount, totalAmount]);

  const totalPayable = finalAmount + deliveryCharge;

  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🔥 MAIN RAZORPAY PAYMENT FUNCTION (ONLY ONE)
  const payWithRazorpay = async () => {
    if (!address) return toast.error("Enter address");

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) return toast.error("Razorpay SDK Failed");

    const { data } = await axios.post(`${API}/api/v1/payment/create-order`, {
      amount: totalPayable,
    });

    if (!data.success) return toast.error("Order create failed");

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      name: "WATCH STORE",
      description: "Order Payment",
      order_id: data.order.id,

      handler: async function (response) {
        const verify = await axios.post(
          `${API}/api/v1/payment/verify`,
          response
        );

        if (verify.data.success) {
          toast.success("Payment Successful!");
          handleOrder("online");
        } else {
          toast.error("Payment Failed");
        }
      },

      theme: { color: "#F4BD50" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  // Coupon Apply
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
        toast.success("Coupon Applied!");
      } else toast.error(data.message);
    } catch {
      toast.error("Coupon error");
    }
  };

  // Save Address
  const saveCurrentAddress = () => {
    if (!address.trim()) return toast.error("Enter address");
    const updated = Array.from(new Set([address, ...savedAddresses]));
    setSavedAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    toast.success("Address Saved");
  };

  // Save Order in DB
  const handleOrder = async (paidMethod = "cod") => {
    const finalData = {
      products: products.map((p) => p._id),
      payment: {
        method: paidMethod,
        status: paidMethod === "cod" ? "pending" : "paid",
      },
      itemsTotal: totalAmount,
      deliveryCharge,
      discount,
      amount: totalPayable,
      address,
      giftMessage,
    };

    const res = await axios.post(`${API}/api/v1/order/create-order`, finalData, {
      headers: { Authorization: `Bearer ${auth?.token}` },
    });

    if (res.data.success) {
      localStorage.removeItem("checkoutProduct");
      localStorage.removeItem("checkoutCart");
      localStorage.removeItem("cart");

      setCart([]);
      navigate("/order-success");
    }
  };

  // Final Button Handler
  const submitOrder = () => {
    if (payment === "cod") handleOrder("cod");
    else if (payment === "online") payWithRazorpay();
    else toast.error("Select payment method");
  };

  return (
    <Layout>
      <div className="px-6 py-10 bg-black text-white min-h-screen pt-24">

        {/* FREE SHIPPING BANNER */}
        <div className="bg-yellow-500 text-black py-2 text-center rounded-lg mb-6">
          {totalAmount >= FREE_SHIP_LIMIT
            ? "🎉 FREE SHIPPING APPLIED!"
            : `Add ₹${FREE_SHIP_LIMIT - totalAmount} more for FREE shipping`}
        </div>

        <h1 className="text-3xl font-bold text-yellow-500 mb-6">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT PRODUCTS */}
          <div className="space-y-6">
            {products.map((p) => (
              <div key={p._id} className="bg-[#1e1e1e] p-5 rounded-xl">
                <img
                  src={`${API}/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <h2 className="text-lg font-bold mt-3">{p.name}</h2>
                <p className="text-yellow-500 font-bold">
                  ₹{p.price} × {p.qty || 1}
                </p>
              </div>
            ))}

            {/* PRICE SUMMARY */}
            <div className="bg-[#1e1e1e] p-5 rounded-lg">
              <div className="flex gap-2 mb-3">
                <input
                  className="flex-1 bg-[#222] p-2 rounded"
                  placeholder="Coupon code"
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

              <p>Items Total: ₹{totalAmount}</p>
              <p>Discount: ₹{discount}</p>
              <p>Delivery: {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</p>

              <hr className="my-3" />

              <p className="text-xl font-bold">Total: ₹{totalPayable}</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 space-y-6">
            {/* ADDRESS */}
            <div className="bg-[#1c1c1c] p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>

              {savedAddresses.map((a, i) => (
                <div
                  key={i}
                  className="bg-[#222] p-3 rounded mb-2 cursor-pointer"
                  onClick={() => setAddress(a)}
                >
                  {a}
                </div>
              ))}

              <textarea
                className="w-full bg-[#222] p-4 rounded-md mb-3"
                rows={3}
                placeholder="Enter address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>

              <button
                onClick={saveCurrentAddress}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Save Address
              </button>

              {/* Gift Message */}
              <h2 className="text-xl font-semibold mt-6 mb-2">Gift Message</h2>
              <textarea
                className="w-full bg-[#222] p-3 rounded-md"
                rows={2}
                placeholder="Write a message..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
              ></textarea>
            </div>

            {/* PAYMENT */}
            <div className="bg-[#1c1c1c] p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>

              <label className="flex gap-3 bg-[#222] p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  onChange={() => setPayment("cod")}
                />
                Cash on Delivery
              </label>

              <label className="flex gap-3 bg-[#222] p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  onChange={() => setPayment("online")}
                />
                Online Payment (Razorpay)
              </label>
            </div>

            {/* PLACE ORDER */}
            <button
              onClick={submitOrder}
              className="w-full bg-yellow-500 text-black font-bold py-4 rounded-lg text-xl"
            >
              Place Order 🚀
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
