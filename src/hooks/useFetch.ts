import { useCallback, useState } from "react";
import { FetchData, Result } from "../interfaces/fetchData";

export const enum FetchMethods {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
  "PATCH" = "PATCH",
}

export const useFetch = () => {
  const [data, setData] = useState<FetchData>({ data: null, error: null, loading: false });
  const [loading, setLoading] = useState(false);
  // TODO IMPLEMENTAR LOADING : TRUE CUANDO SE HACE LA PETICION FETCH AL SERVIDOR

  const handleFetch = useCallback(
    ({ dataFetch, url, method }: { dataFetch?: object; url: string; method: FetchMethods }): Promise<Result> => {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method,
        body: dataFetch ? JSON.stringify(dataFetch) : null,
      })
        .then((response) => {
          console.log(response.status);

          if (!response.ok) {
            const enum MessageError {
              "BAD_REQUEST" = "ocurrio un problema al procesar solicitud",
              "NOT_FOUND" = "no se encontró el recurso",
              "UNAUTHORIZED" = "usuario o contraseña incorrecta",
              "FORBIDDEN" = "usuario no tiene permisos para acceder a este recurso",
              "INTERNAL_SERVER_ERROR" = "Ocurrió un error en el servidor",
            }

            let errorMessage = response.status === 400 ? MessageError.BAD_REQUEST : "";
            errorMessage = response.status === 401 ? MessageError.UNAUTHORIZED : errorMessage;
            errorMessage = response.status === 403 ? MessageError.FORBIDDEN : errorMessage;
            errorMessage = response.status === 404 ? MessageError.NOT_FOUND : errorMessage;
            errorMessage = errorMessage === "" ? MessageError.INTERNAL_SERVER_ERROR : errorMessage;

            setData({
              loading: false,
              error: errorMessage,
              data: null,
            });

            throw new Error(errorMessage);
          }

          return response.json();
        })
        .then((json) => {
          console.log(json);

          setData({
            loading: false,
            error: null,
            data: json,
          });

          return json;
        });
    },
    [setData]
  );

  return { data, setData, handleFetch, loading, setLoading };
};
