import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-white bg-black min-h-screen">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">Order Placed Successfully 🎉</h1>
        <p className="text-gray-300 mb-6">Thank you for your purchase!</p>

        <Link
          to="/"
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-600"
        >
          Continue Shopping →
        </Link>
      </div>
    </Layout>
  );
}
