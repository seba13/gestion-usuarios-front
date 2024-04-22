import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, handleChangeToken } = useContext(AuthContext)!;

  useEffect(() => {
    handleChangeToken();
  }, [token, handleChangeToken]);

  return token ? children : <Navigate to={"/"} />;
};
