import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormLogin } from "../pages/FormLogin/FormLogin";
import { NotFound } from "../pages/NotFound/NotFound";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Dashboard } from "../dashboard/pages/Dashboard/Dashboard";
// import { ListEmployees } from "../dashboard/pages/ListEmployees/ListEmployees";
import { FormEmployee } from "../dashboard/pages/FormEmployee/FormEmployee";
import { Reports } from "../dashboard/pages/Reports/Reports";
import { ProtectedRoute } from "../dashboard/components/ProtectedRoute/ProtectedRoute";
import { ListEmployees2 } from "../dashboard/pages/ListEmployees/ListEmployees2";

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
          element: (
            <ProtectedRoute>
              <ListEmployees2 />
            </ProtectedRoute>
          ),
        },
        {
          path: "/nuevo-colaborador",
          element: (
            <ProtectedRoute>
              <FormEmployee />
            </ProtectedRoute>
          ),
        },
        {
          path: "/generar-reportes",
          element: (
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
