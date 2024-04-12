import { useState } from "react";
import { FetchData } from "../interfaces/fetchData";

export const enum FetchMethods {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
}


export const useFetch = ({ url, method }: { url: string; method: FetchMethods }) => {
  const [data, setData] = useState<FetchData>({ data: null, error: null, loading: false });

  const handleFetch = (dataFetch?: object) => {

    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: dataFetch ? JSON.stringify(dataFetch) : null,
    })
      .then((response) => {
        if (!response.ok) {
          console.log("aca");
          const enum MessageError {
            "UNHAUTORIZED" = "usuario o contraseña incorrecta",
            "FORBIDDEN" = "usuario no tiene permisos para acceder a este recurso",
            "INTERNAL_SERVER_ERROR" = "Ocurrió un error en el",
          }

          const errorMessage = response.status === 401 ? MessageError.UNHAUTORIZED : MessageError.FORBIDDEN || MessageError.INTERNAL_SERVER_ERROR;

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
      });
  };

  return { data, setData, handleFetch };
};
