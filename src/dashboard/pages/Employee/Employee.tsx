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
  const { handleFetch } = useFetch();
  const [empleado, setEmpleado] = useState<IEmployee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const subPages = [PersonalInformation, ContactInformation];

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
    telefono: {
      type: "text",
      value: empleado?.telefono || "",
      required: true,
      name: "telefono",
    },
    correo: {
      type: "text",
      value: empleado?.correo || "",
      required: true,
      name: "correo",
    },
    calle: {
      type: "text",
      value: empleado?.calle || "",
      required: true,
      name: "calle",
    },
    numero: {
      type: "text",
      value: empleado?.numero || "",
      required: true,
      name: "numero",
    },
    comuna: {
      type: "text",
      value: empleado?.comuna || "",
      required: true,
      name: "comuna",
    },
    region: {
      type: "text",
      value: empleado?.region || "",
      required: true,
      name: "region",
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
    handleFetch({ url: `http://localhost:80/empleado/rut/${rut}`, method: FetchMethods.GET })
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

      handleChange({
        name: "region",
        value: empleado.region,
        type: "text",
      });

      handleChange({
        name: "comuna",
        value: empleado.comuna,
        type: "text",
      });

      handleChange({
        name: "calle",
        value: empleado.calle,
        type: "text",
      });

      handleChange({
        name: "numero",
        value: empleado.numero,
        type: "text",
      });

      handleChange({
        name: "telefono",
        value: empleado.telefono,
        type: "text",
      });

      handleChange({
        name: "correo",
        value: empleado.correo,
        type: "text",
      });
    }
  }, [empleado]);

  return (
    <div className="card flex  flex-column align-items-center animate__animated animate__fadeInLeft" style={{ zIndex: -1 }}>
      {isLoading && <LoadingSpinner />}

      <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />

      {empleado && (
        <form className="align-self-start m-4">
          {subPages[activeIndex]({ form, handleChange })}

          {/* {activeIndex === 0 && <PersonalInformation form={form} handleChange={handleChange} />} */}
          {/* {activeIndex === 1 && <ContactInformation form={form} handleChange={handleChange} />} */}

          {(activeIndex === 0 || activeIndex === 1) && <Button label="Guardar" className="mt-4" />}
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
