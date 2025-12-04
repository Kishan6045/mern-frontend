import { useCart } from "../context/cart";
import Layout from "../components/Layout/Layout";
import { API } from "../config";
import { useNavigate } from "react-router-dom";

// ⭐ Icons
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // ➕ Increase qty
    const increaseQty = (id) => {
        const updated = cart.map((item) =>
            item._id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // ➖ Decrease qty
    const decreaseQty = (id) => {
        const updated = cart
            .map((item) =>
                item._id === id ? { ...item, qty: (item.qty || 1) - 1 } : item
            )
            .filter((item) => item.qty > 0);

        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // ❌ Remove item
    const removeItem = (id) => {
        const updated = cart.filter((item) => item._id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // 💰 Total Price
    const totalPrice = () => {
        return cart.reduce(
            (total, item) => total + item.price * (item.qty || 1),
            0
        );
    };

    return (
        <Layout>
            <div className="p-6 pt-16 min-h-screen bg-black text-white">
                <h1 className="text-3xl font-bold text-yellow-500 mb-6 flex items-center gap-2">
                    <FaShoppingCart className="text-yellow-500" /> Your Cart
                </h1>

                {cart.length === 0 ? (
                    <h2 className="text-center text-xl text-gray-400 mt-10">
                        Your cart is empty 🛒
                    </h2>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* LEFT: CART PRODUCTS */}
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

                                    {/* Product Content */}
                                    <div className="ml-4 flex flex-col justify-between flex-1">

                                        {/* Name + Price */}
                                        <div>
                                            <h3 className="text-lg font-semibold">{p.name}</h3>
                                            <p className="text-yellow-500 font-bold">
                                                ₹{p.price}
                                            </p>
                                        </div>

                                        {/* ⭐ Quantity Buttons */}
                                        <div className="flex items-center gap-4 mt-3">
                                            <button
                                                onClick={() => decreaseQty(p._id)}
                                                className="p-2 bg-[#333] rounded-full hover:bg-[#444] transition"
                                            >
                                                <AiOutlineMinus className="text-white text-xl" />
                                            </button>

                                            <span className="text-xl font-bold">{p.qty || 1}</span>

                                            <button
                                                onClick={() => increaseQty(p._id)}
                                                className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition text-black"
                                            >
                                                <AiOutlinePlus className="text-black text-xl" />
                                            </button>
                                        </div>

                                        {/* ❌ Remove */}
                                        <button
                                            onClick={() => removeItem(p._id)}
                                            className="flex items-center gap-2 text-red-400 mt-3 hover:text-red-600"
                                        >
                                            <AiFillDelete className="text-xl" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT: ORDER SUMMARY */}
                        <div className="bg-[#1f1f1f] p-6 rounded-xl border border-yellow-600 shadow-xl">
                            <h2 className="text-xl mb-4 font-semibold text-yellow-400">
                                Order Summary
                            </h2>

                            <div className="flex justify-between text-lg mb-3">
                                <span>Total Items</span>
                                <span>{cart.reduce((t, i) => t + (i.qty || 1), 0)}</span>
                            </div>

                            <div className="flex justify-between text-lg font-bold text-yellow-500 mb-6">
                                <span>Total Price</span>
                                <span>₹{totalPrice()}</span>
                            </div>

                            <button
                                onClick={() => {
                                    localStorage.setItem("checkoutCart", JSON.stringify(cart));
                                    navigate("/checkout");
                                }}
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
