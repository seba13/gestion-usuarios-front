import { useNavigate, useParams } from "react-router-dom";
import { FetchMethods, useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Employee as IEmployee } from "../../../interfaces/Employees";
import { TabMenu } from "primereact/tabmenu";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { ContactInformation } from "./ContactInformation/ContactInformation";
import { Button } from "primereact/button";
import { useForm } from "../../../hooks/useForm";
import { FormData } from "../../../interfaces/formData";

export const Employee = () => {
  const navigate = useNavigate();
  const { rut = "" } = useParams();
  const { handleFetch } = useFetch({ method: FetchMethods.GET });
  const [empleado, setEmpleado] = useState<IEmployee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const initialData: FormData = {
    nombre: {
      type: "text",
      value: empleado?.nombre || "",
      required: true,
      name: "nombre",
    },
    paterno: {
      type: "text",
      value: empleado?.paterno || "",
      required: true,
      name: "paterno",
    },
    materno: {
      type: "text",
      value: empleado?.materno || "",
      required: true,
      name: "materno",
    },
    profesion: {
      type: "text",
      value: empleado?.profesion || "",
      required: true,
      name: "materno",
    },
    rut: {
      type: "text",
      value: empleado?.rut || "",
      required: true,
      name: "rut",
    },
    estadoCivil: {
      type: "text",
      value: empleado?.estadoCivil || "",
      required: true,
      name: "estadoCivil",
    },
    fecNac: {
      type: "text",
      value: empleado?.fecNac || "",
      required: true,
      name: "fecNac",
    },
    dv: {
      type: "text",
      value: empleado?.dv || "",
      required: true,
      name: "dv",
    },
    sexo: {
      type: "text",
      value: empleado?.sexo || "",
      required: true,
      name: "sexo",
    },
  };

  const { form, handleChange } = useForm({ initialData });

  const items = [
    { label: "Información Personal", icon: "pi pi-home" },
    { label: "Información de Contacto", icon: "pi pi-chart-line" },
    { label: "Crear Cartas", icon: "pi pi-chart-line" },
    { label: "Descargar Cartas", icon: "pi pi-chart-line" },
  ];

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

  useEffect(() => {
    // export interface InputAttr {
    //     value: string;
    //     type: string;
    //     required?: boolean;
    //     maxLength?: number;
    //     minLength?: number;
    //     patter?: RegExp;
    //     name?: string;
    //     see?: boolean;
    //   }
    if (empleado) {
      handleChange({
        name: "nombre",
        value: empleado.nombre,
        type: "text",
      });

      handleChange({
        name: "rut",
        value: empleado.rut,
        type: "text",
      });

      handleChange({
        name: "dv",
        value: empleado.dv,
        type: "text",
      });

      handleChange({
        name: "paterno",
        value: empleado.paterno,
        type: "text",
      });
      handleChange({
        name: "materno",
        value: empleado.materno,
        type: "text",
      });
      handleChange({
        name: "profesion",
        value: empleado.profesion,
        type: "text",
      });

      handleChange({
        name: "fecNac",
        value: empleado.fecNac,
        type: "text",
      });

      handleChange({
        name: "estadoCivil",
        value: empleado.estadoCivil,
        type: "text",
      });

      handleChange({
        name: "sexo",
        value: empleado.sexo,
        type: "text",
      });
    }
  }, [empleado]);

  return (
    <div className="card flex  flex-column align-items-center">
      {isLoading && <LoadingSpinner />}

      <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />

      {empleado && (
        <form>
          {activeIndex === 0 && <PersonalInformation form={form} handleChange={handleChange} />}
          {activeIndex === 1 && <ContactInformation />}

          {(activeIndex === 0 || activeIndex === 1) && <Button label="Guardar" />}
        </form>
      )}
    </div>
  );

  //   return (
  //     <>
  //       {isLoading && <p>cargando</p>}

  //       {empleado && <div>Employee {empleado.rut}</div>}
  //     </>
  //   );
};
