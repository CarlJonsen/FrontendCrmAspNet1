import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
interface Props {
  children: React.ReactNode;
}
interface JwtPayload {
    exp: number;
  }

const PrivateRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
