import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // optional: decode/validate expiry if you’re using JWT
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }
  } catch {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
