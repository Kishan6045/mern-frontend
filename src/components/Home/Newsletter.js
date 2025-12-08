import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return alert("Please enter email");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setEmail("");
  };

  return (
    <section className="py-14 px-6 max-w-4xl mx-auto">
      <div className="bg-[#111] p-8 rounded-2xl border border-yellow-500/30 text-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-3">
          Stay Updated with New Launches
        </h2>
        <p className="text-gray-300 mb-6 text-sm md:text-base">
          Join our newsletter and be the first to know about new arrivals,
          exclusive offers, and special discounts.
        </p>

        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md bg-[#181818] border border-gray-600 text-white outline-none w-full md:w-72"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Subscribe
          </button>
        </div>

        {sent && (
          <p className="mt-3 text-green-400 text-sm">
            ✅ Subscribed successfully! (demo)
          </p>
        )}
      </div>
    </section>
  );
}
