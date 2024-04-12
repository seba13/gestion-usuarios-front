import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useContext(AuthContext)!;

  return token ? children : <Navigate to={"/"}></Navigate>;
};
