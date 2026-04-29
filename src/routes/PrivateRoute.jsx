import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
