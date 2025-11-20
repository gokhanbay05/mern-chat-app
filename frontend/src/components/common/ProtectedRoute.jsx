import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/auth.store";

const ProtectedRoute = () => {
  const { user } = useAuthStore((state) => state);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
