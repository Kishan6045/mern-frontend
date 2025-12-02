import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
  const [auth] = useAuth();

  return auth?.user ? children : <Navigate to="/login" />;
}
