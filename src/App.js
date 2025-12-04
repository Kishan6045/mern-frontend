import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import UserRoute from "./components/Routes/UserRoute";
import AdminRoute from "./components/Routes/AdminRoute";

import UserDashboard from "./pages/user/UserDashboard";
import UserOrders from "./pages/user/UserOrders";
import UpdateProfile from "./pages/user/UpdateProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import EditProduct from "./pages/admin/EditProduct";
import ViewUser from "./pages/admin/ViewUser";




import { CartProvider } from "./context/cart";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster />

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* USER ROUTES */}
          <Route path="/dashboard/user" element={<UserRoute><UserDashboard /></UserRoute>} />
          <Route path="/dashboard/user/orders" element={<UserRoute><UserOrders /></UserRoute>} />
          <Route path="/dashboard/user/profile" element={<UserRoute><UpdateProfile /></UserRoute>} />

          {/* ADMIN ROUTES */}
          <Route path="/dashboard/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/dashboard/admin/create-category" element={<AdminRoute><CreateCategory /></AdminRoute>} />
          <Route path="/dashboard/admin/create-product" element={<AdminRoute><CreateProduct /></AdminRoute>} />
          <Route path="/dashboard/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/dashboard/admin/products/:slug" element={<EditProduct />} />
          <Route path="/dashboard/admin/user/:id" element={<ViewUser />} />


          <Route
  path="/dashboard/admin/analytics"
  element={
    <AdminRoute>
      <AdminAnalytics />
    </AdminRoute>
  }
/>
          <Route path="/dashboard/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/dashboard/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
