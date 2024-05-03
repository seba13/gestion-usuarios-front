import { createContext, useEffect, useMemo, useState } from "react";
import { AuthenticateUser } from "../interfaces/authenticateUser";
import Cookies from "universal-cookie";
import { FetchMethods, useFetch } from "../hooks/useFetch";

import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthenticateUser | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const cookies = new Cookies();
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [rutEmisor, setRutEmisor] = useState<string | null>(null);
  const [idEmisor, setIdEmisor] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<{ idUsuario: string; usuario: string; idEmpleado: string; rut: string }>(token);

      console.log(decoded);
      setUsuario(decoded.usuario);
      setIdEmisor(decoded.idEmpleado);
      setRutEmisor(decoded.rut);
    }
  }, [token]);

  const { handleFetch } = useFetch();

  const handleChangeToken = useMemo(
    () => () => {
      if (cookies.get("cookie-token")) {
        setToken(cookies.get("cookie-token"));
      }
    },
    []
  );

  useEffect(() => {
    handleChangeToken();
  }, []);

  const validateToken = () => {
    return handleFetch({ url: `${import.meta.env.VITE_URL_API}verifyToken`, method: FetchMethods.GET })
      .then((response) => {
        if (response.code === 200) return true;
        return false;
      })
      .catch(() => {
        return false;
      });
  };

  const logout = () => {
    cookies.remove("cookie-token");
    setToken(null);

    handleFetch({ url: `${import.meta.env.VITE_URL_API}exit/${rutEmisor}`, method: FetchMethods.GET }).then((response) => {
      console.log("aca");
      if (response.code === 200) {
        console.log("sesión cerrada");
      }
    });
  };

  //   useEffect(() => {
  //     handleChangeToken({ token: "" });
  //   }, [token]);

  return <AuthContext.Provider value={{ validateToken, usuario, idEmisor, rutEmisor, token, setToken, handleChangeToken, logout }}>{children}</AuthContext.Provider>;
};
