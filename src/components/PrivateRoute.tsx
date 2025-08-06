import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/authStore";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}