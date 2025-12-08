import { useEffect, useState } from "react";
import { API } from "../config";
import QRCode from "react-qr-code";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

export default function UPIPayment({ amount, upiId = "kishan@ybl", name = "Kishan Patel" }) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // FORMAT TIME
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // UPI QR DATA
  const qrString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${amount}&cu=INR`;

  // COPY UPI
  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast.success("UPI ID Copied");
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 px-6 flex justify-center">
      <div className="bg-[#1b1b1b] p-6 rounded-xl max-w-md w-full shadow-xl">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center text-yellow-500 mb-2">
          Complete Your Payment
        </h1>

        {/* TIMER */}
        <p className="text-center text-gray-300 mb-4">
          Payment expires in:{" "}
          <span className="text-yellow-500 font-bold">{formatTime(timeLeft)}</span>
        </p>

        {/* QR CODE */}
        <div className="bg-white p-4 rounded-lg flex justify-center">
          <QRCode value={qrString} size={200} />
        </div>

        {/* NAME + VERIFIED */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-yellow-500">{name}</h2>
          <p className="text-gray-400">{upiId}</p>

          <div className="flex justify-center items-center gap-2 mt-1 text-green-400">
            <FiCheckCircle />
            <span className="text-sm">UPI Verified</span>
          </div>
        </div>

        {/* AMOUNT */}
        <div className="mt-5 bg-[#222] p-3 rounded-lg text-center">
          <p className="text-gray-300">Amount to Pay</p>
          <p className="text-3xl font-bold text-yellow-500">₹{amount}</p>
        </div>

        {/* COPY BUTTON */}
        <button
          onClick={copyUPI}
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg mt-4 hover:bg-yellow-600 flex justify-center items-center gap-2"
        >
          <FiCopy />
          Copy UPI ID
        </button>

        {/* PAYMENT APPS */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <button className="bg-[#222] p-3 rounded-lg hover:bg-[#333]">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Google_Pay_Logo.svg" alt="" className="h-6 mx-auto" />
            <p className="text-xs mt-1">GPay</p>
          </button>

          <button className="bg-[#222] p-3 rounded-lg hover:bg-[#333]">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/PhonePe_Logo.png" alt="" className="h-6 mx-auto" />
            <p className="text-xs mt-1">PhonePe</p>
          </button>

          <button className="bg-[#222] p-3 rounded-lg hover:bg-[#333]">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/Paytm_Logo.png" alt="" className="h-6 mx-auto" />
            <p className="text-xs mt-1">Paytm</p>
          </button>
        </div>

        {/* PAYMENT DONE BUTTON */}
        <button
          onClick={() => toast.success("We are verifying your payment...")}
          className="w-full bg-green-600 mt-8 py-3 rounded-lg text-white text-lg hover:bg-green-700"
        >
          I Have Paid ✔
        </button>
      </div>
    </div>
  );
}
