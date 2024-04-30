import { createContext, useMemo, useState } from "react";
import { AuthenticateUser } from "../interfaces/authenticateUser";
import Cookies from "universal-cookie";
import { FetchMethods, useFetch } from "../hooks/useFetch";

export const AuthContext = createContext<AuthenticateUser | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const cookies = new Cookies();
  const [token, setToken] = useState<string | null>(null);

  const { handleFetch } = useFetch();

  const handleChangeToken = useMemo(
    () => () => {
      if (cookies.get("cookie-token")) {
        setToken(cookies.get("cookie-token"));
      }
    },
    []
  );

  const validateToken = () => {
    console.log("entra ac");
    return handleFetch({ url: "http://localhost/verifyToken", method: FetchMethods.GET })
      .then((response) => {
        console.log("entra acá");

        console.log(response.code);

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
  };

  //   useEffect(() => {
  //     handleChangeToken({ token: "" });
  //   }, [token]);

  return <AuthContext.Provider value={{ validateToken, token, setToken, handleChangeToken, logout }}>{children}</AuthContext.Provider>;
};
