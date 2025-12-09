import React from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { API } from "../../config";
import { useCart } from "../../context/cart";

export default function ProductCard({
  p,
  isInWishlist,
  onWishlistToggle,
  onQuickView,
  small,
  showNewBadge,
}) {
  const imgUrl = `${API}/api/v1/product/product-photo/${p._id}?index=0`;

  const [cart, setCart] = useCart();

  // ⭐ CHECK IF PRODUCT ALREADY IN CART
  const existing = cart.find((item) => item._id === p._id);
  const qty = existing ? existing.qty : 0;

  // ⭐ ADD TO CART
  const handleAdd = () => {
    let updated;

    if (existing) {
      updated = cart.map((item) =>
        item._id === p._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updated = [...cart, { ...p, qty: 1 }];
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ⭐ REMOVE OR DECREASE QTY
  const handleRemove = () => {
    if (qty <= 1) {
      const updated = cart.filter((item) => item._id !== p._id);
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      return;
    }

    const updated = cart.map((item) =>
      item._id === p._id ? { ...item, qty: item.qty - 1 } : item
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div
      className={`relative bg-[#111] border border-yellow-500/20 hover:border-yellow-500/60 
      rounded-2xl p-4 shadow-lg transition cursor-pointer 
      ${small ? "h-[360px]" : "h-[420px]"}`}
    >
      {/* ❤️ WISHLIST BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onWishlistToggle();
        }}
        className="absolute right-3 top-3 text-xl"
      >
        {isInWishlist ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-yellow-400" />
        )}
      </button>

      {/* IMAGE */}
      <div className="w-full h-48 rounded-xl overflow-hidden mb-3">
        <img src={imgUrl} alt={p.name} className="w-full h-full object-cover" />
      </div>

      {/* NAME + PRICE */}
      <h3 className="text-lg font-semibold">{p.name}</h3>
      <p className="text-yellow-400 font-bold text-xl mb-3">₹{p.price}</p>

      {/* ⭐ ADD TO CART OR - QTY + UI */}
      <div className="flex flex-col gap-2">

        {qty === 0 ? (
          // ⭐ DEFAULT — ADD TO CART BUTTON
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-black py-2 
                       rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <FaShoppingCart /> Add to Cart
          </button>
        ) : (
          // ⭐ CUSTOM — - QTY + UI
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between bg-black border border-yellow-500 rounded-lg px-3 py-2"
          >
            {/* – BUTTON */}
            <button
              onClick={handleRemove}
              className="bg-gray-800 text-white px-3 py-1 rounded-full text-lg hover:bg-gray-700"
            >
              –
            </button>

            {/* QTY DISPLAY */}
            <span className="text-yellow-400 font-bold text-lg">{qty}</span>

            {/* + BUTTON */}
            <button
              onClick={handleAdd}
              className="bg-yellow-500 text-black px-3 py-1 rounded-full text-lg hover:bg-yellow-400"
            >
              +
            </button>
          </div>
        )}

        {/* QUICK VIEW */}
        {/* QUICK VIEW BUTTON */}
        <div className="mt-3 w-full px-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="
      w-full
      py-3
      flex items-center justify-center gap-2
      border border-yellow-500
      rounded-xl
      text-yellow-400
      font-semibold
      hover:bg-yellow-500 hover:text-black
      transition
    "
          >
            ⚡ Quick View
          </button>
        </div>

      </div>
    </div>
  );
}
