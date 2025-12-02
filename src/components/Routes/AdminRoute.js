import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const [auth] = useAuth();

  return auth?.user?.role === 1 ? children : <Navigate to="/login" />;
}
