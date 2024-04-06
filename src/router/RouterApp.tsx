import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormLogin } from "../pages/FormLogin/FormLogin";
import { NotFound } from "../pages/NotFound/NotFound";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Dashboard } from "../dashboard/pages/Dashboard/Dashboard";
import { ListEmployees } from "../dashboard/pages/ListEmployees/ListEmployees";
import { FormEmployee } from "../dashboard/pages/FormEmployee/FormEmployee";
import { Reports } from "../dashboard/pages/Reports/Reports";

// import { AuthenticateUser } from "../interfaces/authenticateUser";
// import { Dashboard } from "../pages/Dashboard/Dashboard";

export const AppRouter = () => {
  const { token } = useContext(AuthContext)!;

  const router = createBrowserRouter([
    {
      path: "/",
      Component: token ? Dashboard : FormLogin,
      errorElement: <NotFound></NotFound>,
      children: [
        {
          path: "/",
          Component: ListEmployees,
        },
        {
          path: "/nuevo-colaborador",
          Component: FormEmployee,
        },
        {
          path: "/generar-reportes",
          Component: Reports,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
