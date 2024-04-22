import { createContext, useMemo, useState } from "react";
import { AuthenticateUser } from "../interfaces/authenticateUser";

import Cookies from "universal-cookie";

export const AuthContext = createContext<AuthenticateUser | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const cookies = new Cookies();
  const [token, setToken] = useState<string | null>(cookies.get("cookie-token"));

  const handleChangeToken = useMemo(
    () => () => {
      setToken(cookies.get("cookie-token"));
    },
    []
  );

  const logout = () => {
    cookies.remove("cookie-token");
    setToken(null);
  };

  //   useEffect(() => {
  //     handleChangeToken({ token: "" });
  //   }, [token]);

  return <AuthContext.Provider value={{ token, setToken, handleChangeToken, logout }}>{children}</AuthContext.Provider>;
};
