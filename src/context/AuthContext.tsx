import { createContext, useMemo, useState } from "react";
import { AuthenticateUser } from "../interfaces/authenticateUser";

export const AuthContext = createContext<AuthenticateUser | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const handleChangeToken = useMemo(
    () =>
      ({ token }: { token: string }) => {
        console.log("aca");

        console.log(token);

        setToken(() => {
          //   const jwt = window.localStorage.getItem("token") || "";
          const jwt = token;

          console.log(token);

          //proceso de validacion
          //llamar a utils validate jwt fetch en server

          return jwt == "123456" ? jwt : "";
        });
      },
    []
  );

  const logout = () => {
    setToken(null);
  };

  //   useEffect(() => {
  //     handleChangeToken({ token: "" });
  //   }, [token]);

  return <AuthContext.Provider value={{ token, setToken, handleChangeToken, logout }}>{children}</AuthContext.Provider>;
};
