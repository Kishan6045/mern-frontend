import { useCart } from "../context/cart";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

export default function Cart() {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Total Price Calculate
  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Remove Item
  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <Layout>
      <div className="p-6 pt-16 min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <h2 className="text-center text-xl text-gray-400 mt-10">
            Your cart is empty 🛒
          </h2>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Left: Product List */}
            <div className="md:col-span-2 space-y-5">
              {cart.map((p) => (
                <div
                  key={p._id}
                  className="flex bg-[#1d1d1d] p-4 rounded-xl shadow border border-[#333]"
                >
                  {/* Image */}
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    className="w-28 h-28 rounded-lg object-cover"
                    alt={p.name}
                  />

                  {/* Details */}
                  <div className="ml-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <p className="text-yellow-500 font-bold">₹{p.price}</p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(p._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary */}
            <div className="bg-[#1f1f1f] p-6 rounded-xl border border-yellow-600 shadow-xl">
              <h2 className="text-xl mb-4 font-semibold">Order Summary</h2>

              <div className="flex justify-between text-lg mb-3">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-yellow-500 mb-6">
                <span>Total Price</span>
                <span>₹{totalPrice()}</span>
              </div>

              {/* Checkout */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Proceed to Checkout →
              </button>
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
}
