import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";   // ⭐ ADD THIS
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <CartProvider>       {/* ⭐ ADD THIS WRAPPER */}
      <App />
    </CartProvider>
  </AuthProvider>
);
