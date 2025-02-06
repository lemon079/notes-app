import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  return useAuth() ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
