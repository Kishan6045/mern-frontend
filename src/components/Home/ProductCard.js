import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { API } from "../../config";

export default function ProductCard({
  p,
  small,
  showNewBadge,
  isInWishlist,
  onWishlistToggle,
  onAddToCart,
  onQuickView,
}) {
  return (
    <div className="relative bg-[#111] p-4 rounded-xl border border-transparent hover:border-yellow-500 transition transform hover:-translate-y-1">
      {showNewBadge && (
        <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
          NEW
        </span>
      )}

      <button
        onClick={onWishlistToggle}
        className="absolute top-3 right-3 text-red-500 hover:scale-110 transition"
      >
        <FaHeart
          className={
            isInWishlist ? "fill-red-500" : "fill-transparent stroke-red-500"
          }
        />
      </button>

      <div
        className="overflow-hidden rounded-md cursor-pointer"
        onClick={onQuickView}
      >
        <img
          src={`${API}/api/v1/product/product-photo/${p._id}`}
          className={`${
            small ? "h-40" : "h-56"
          } w-full object-cover transform hover:scale-105 transition`}
          alt={p.name}
        />
      </div>

      <h3 className="text-lg mt-4 font-semibold line-clamp-1">{p.name}</h3>
      <p className="text-yellow-400 mt-1 text-base">₹{p.price}</p>

      <div className="mt-4 flex justify-between items-center text-sm">
        <button
          onClick={onAddToCart}
          className="px-3 py-1.5 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition flex items-center gap-1"
        >
          <FaShoppingCart /> <span>Add to Cart</span>
        </button>
        <button
          onClick={onQuickView}
          className="px-3 py-1.5 bg-transparent border border-gray-500 rounded hover:border-yellow-500 text-xs"
        >
          Quick View
        </button>
      </div>
    </div>
  );
}
