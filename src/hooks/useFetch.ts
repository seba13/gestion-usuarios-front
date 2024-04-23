import { useCallback, useState } from "react";
import { FetchData, Result } from "../interfaces/fetchData";

export const enum FetchMethods {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
}

export const useFetch = ({ method }: { method: FetchMethods }) => {
  const [data, setData] = useState<FetchData>({ data: null, error: null, loading: false });
  const [loading, setLoading] = useState(false);
  // TODO IMPLEMENTAR LOADING : TRUE CUANDO SE HACE LA PETICION FETCH AL SERVIDOR

  const handleFetch = useCallback(
    ({ dataFetch, url }: { dataFetch?: object; url: string }): Promise<Result> => {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method,
        body: dataFetch ? JSON.stringify(dataFetch) : null,
      })
        .then((response) => {
          if (!response.ok) {
            console.log("aca");
            const enum MessageError {
              "UNAUTHORIZED" = "usuario o contraseña incorrecta",
              "FORBIDDEN" = "usuario no tiene permisos para acceder a este recurso",
              "INTERNAL_SERVER_ERROR" = "Ocurrió un error en el",
            }

            const errorMessage = response.status === 401 ? MessageError.UNAUTHORIZED : MessageError.FORBIDDEN || MessageError.INTERNAL_SERVER_ERROR;

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
    [setData, method]
  );

  return { data, setData, handleFetch, loading, setLoading };
};
