import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, id }: { children: React.ReactNode; id: number }) => {
  const { validateToken, token, logout, handleChangeToken } = useContext(AuthContext)!;

  useEffect(() => {
    validateToken().then((valid) => {
      if (valid) {
        handleChangeToken();
      } else {
        logout();
      }
    });
  }, [id]);

  return token ? children : <Navigate to={"/"} />;
};
