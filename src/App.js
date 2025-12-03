import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products";

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

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<Products />} />


        {/* USER ROUTES */}
        <Route path="/dashboard/user" element={<UserRoute><UserDashboard /></UserRoute>} />
        <Route path="/dashboard/user/orders" element={<UserRoute><UserOrders /></UserRoute>} />
        <Route path="/dashboard/user/profile" element={<UserRoute><UpdateProfile /></UserRoute>} />

        {/* ADMIN ROUTES */}
        <Route path="/dashboard/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/dashboard/admin/create-category" element={<AdminRoute><CreateCategory /></AdminRoute>} />
        <Route path="/dashboard/admin/create-product" element={<AdminRoute><CreateProduct /></AdminRoute>} />
        <Route path="/dashboard/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/dashboard/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
