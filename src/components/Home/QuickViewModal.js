import { FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { API } from "../../config";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  cart,
  setCart
}) {

  const hasMultipleImages = product.images && product.images.length > 0;

  const existing = cart?.find((item) => item._id === product._id);
  const qty = existing ? existing.qty : 0;

  return (
    <div className="
      fixed inset-0 bg-black/70 
      flex items-center justify-center 
      z-50 px-3 py-4 
      overflow-y-auto
    ">
      <div className="
        bg-[#111] 
        w-full max-w-xl md:max-w-2xl 
        rounded-2xl 
        p-4 md:p-6 
        relative 
        border border-yellow-500/40 
        shadow-xl
      ">

        {/* 🔥 Responsive CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute 
            top-2 right-2 md:top-4 md:right-4
            w-9 h-9 md:w-10 md:h-10
            flex items-center justify-center
            rounded-full 
            bg-black/60 backdrop-blur-md 
            border border-white/20 
            hover:bg-black/80 
            hover:scale-110 
            transition 
            z-50
          "
        >
          <FiX className="text-white text-lg md:text-xl" />
        </button>

        {/* 🔥 Responsive GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

          {/* IMAGES */}
          <div className="overflow-hidden rounded-lg">
            {hasMultipleImages ? (
              <Swiper
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="w-full h-64"
              >
                {product.images.map((_, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${API}/api/v1/product/product-photo/${product._id}?index=${index}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={`${API}/api/v1/product/product-photo/${product._id}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>

          {/* DETAILS */}
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

            {/* ⭐ ADD TO CART OR - QTY + */}
            {qty === 0 ? (
              <button
                className="
                  w-full px-5 py-3 
                  bg-yellow-500 text-black 
                  rounded-lg 
                  hover:bg-yellow-400 
                  transition 
                  font-bold 
                  flex items-center justify-center gap-2 
                  shadow-lg
                "
                onClick={() => onAddToCart(product)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            ) : (
              <div className="
                flex items-center justify-between 
                w-full 
                bg-black 
                border border-yellow-500 
                rounded-lg 
                px-4 py-3 
                shadow-lg
              ">
                {/* – BUTTON */}
                <button
                  onClick={() => {
                    const updated =
                      qty === 1
                        ? cart.filter((item) => item._id !== product._id)
                        : cart.map((item) =>
                            item._id === product._id
                              ? { ...item, qty: item.qty - 1 }
                              : item
                          );

                    setCart(updated);
                    localStorage.setItem("cart", JSON.stringify(updated));
                  }}
                  className="
                    bg-gray-800 text-white 
                    px-4 py-1 
                    rounded-full 
                    text-xl 
                    hover:bg-gray-700 
                    transition
                  "
                >
                  –
                </button>

                {/* QTY */}
                <span className="text-yellow-400 text-xl font-bold">
                  {qty}
                </span>

                {/* + BUTTON */}
                <button
                  onClick={() => onAddToCart(product)}
                  className="
                    bg-yellow-500 text-black 
                    px-4 py-1 
                    rounded-full 
                    text-xl 
                    hover:bg-yellow-400 
                    transition
                  "
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
