import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-gray-300 pt-12 mt-10 border-t border-yellow-500/20">
      
      {/* MAIN FOOTER GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* COMPANY INFO */}
        <div>
          <h3 className="text-xl font-bold text-yellow-500 mb-4">WATCH STORE</h3>
          <p className="text-sm text-gray-400">
            Premium watches crafted with precision and timeless elegance.
            Trusted by thousands of customers across India.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-500" /> Surat, Gujarat, India
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-yellow-500" /> +91 98765 43210
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500" /> support@watchstore.in
            </p>
          </div>
        </div>

        {/* SHOP LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Men's Watches</li>
            <li className="hover:text-yellow-400 cursor-pointer">Women's Watches</li>
            <li className="hover:text-yellow-400 cursor-pointer">Smart Watches</li>
            <li className="hover:text-yellow-400 cursor-pointer">Classic Watches</li>
            <li className="hover:text-yellow-400 cursor-pointer">Premium Limited Edition</li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-4">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Track Order</li>
            <li className="hover:text-yellow-400 cursor-pointer">FAQs</li>
            <li className="hover:text-yellow-400 cursor-pointer">Return & Refund</li>
            <li className="hover:text-yellow-400 cursor-pointer">Shipping Policy</li>
            <li className="hover:text-yellow-400 cursor-pointer">Warranty</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400">
            Subscribe to receive exclusive offers & new arrivals.
          </p>

          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-l outline-none text-white text-sm"
            />
            <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-r hover:bg-yellow-600">
              Join
            </button>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-5 text-xl">
            <FaFacebook className="hover:text-yellow-500 cursor-pointer" />
            <FaInstagram className="hover:text-yellow-500 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-500 cursor-pointer" />
            <FaYoutube className="hover:text-yellow-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* COPYRIGHT STRIP */}
      <div className="mt-10 border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Watch Store. All Rights Reserved.
      </div>
    </footer>
  );
}
