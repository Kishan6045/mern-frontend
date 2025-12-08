import { FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { API } from "../../config";

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-[#111] max-w-2xl w-full rounded-2xl p-6 relative border border-yellow-500/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
          rounded-full bg-black/40 backdrop-blur-md border border-white/20 
          hover:bg-black/60 hover:scale-110 transition-all shadow-lg"
        >
          <FiX className="text-white text-xl" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-lg">
            <img
              src={`${API}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">
              {product.name}
            </h2>
            <p className="text-yellow-400 text-xl mb-2">₹{product.price}</p>

            {product.description && (
              <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                {product.description}
              </p>
            )}

            <p className="text-sm text-gray-400 mb-1">
              Category: {product.category?.name || "—"}
            </p>

            <p className="text-sm text-gray-400 mb-4">
              Stock: {product.quantity ?? "—"}
            </p>

            <button
              className="w-full px-5 py-2 bgyellow-500 text-black rounded-md hover:bg-yellow-600 transition flex items-center justify-center gap-2"
              onClick={() => onAddToCart(product)}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
