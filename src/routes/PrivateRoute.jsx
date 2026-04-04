import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
// import LoadingSpinner from "../components/Shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-[#CEB45F]"></span>
      </div>
    );
  if (!user) return <Navigate to="/login" state={location.pathname} replace />;
  return children;
};

export default PrivateRoute;
