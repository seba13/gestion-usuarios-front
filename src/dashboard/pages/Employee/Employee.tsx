import { useNavigate, useParams } from "react-router-dom";
import { FetchMethods, useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Employee as IEmployee } from "../../../interfaces/Employees";

export const Employee = () => {
  const navigate = useNavigate();
  const { rut = "" } = useParams();
  const { handleFetch } = useFetch({ method: FetchMethods.GET });
  const [empleado, setEmpleado] = useState<IEmployee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleFetch({ url: `http://localhost:80/empleado/rut/${rut}` })
      .then((data) => {
        console.log(data);

        if (data.code === 200) {
          setEmpleado(data.message as IEmployee);
        }
        setIsLoading(false); // Marcar la carga como completada
      })
      .catch(() => {
        navigate("/");
      });
  }, [rut]);

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar un indicador de carga
  }

  return (
    <>
      {isLoading && <p>cargando</p>}

      {empleado && <div>Employee</div>}
    </>
  );
};
