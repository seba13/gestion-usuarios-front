import { Steps } from "primereact/steps";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { useState } from "react";
import { Button } from "primereact/button";
import { PersonalInformation } from "../Employee/PersonalInformation/PersonalInformation";
import { useForm } from "../../../hooks/useForm";
import { FormData } from "../../../interfaces/formData";
import { ContactInformation } from "../Employee/ContactInformation/ContactInformation";

export const FormEmployee = () => {
  const initialData: FormData = {
    nombre: {
      type: "text",
      value: "",
      required: true,
      name: "nombre",
    },
    paterno: {
      type: "text",
      value: "",
      required: true,
      name: "paterno",
    },
    materno: {
      type: "text",
      value: "",
      required: true,
      name: "materno",
    },
    profesion: {
      type: "text",
      value: "",
      required: true,
      name: "materno",
    },
    rut: {
      type: "text",
      value: "",
      required: true,
      name: "rut",
    },
    estadoCivil: {
      type: "text",
      value: "",
      required: true,
      name: "estadoCivil",
    },
    fecNac: {
      type: "text",
      value: "",
      required: true,
      name: "fecNac",
    },
    dv: {
      type: "text",
      value: "",
      required: true,
      name: "dv",
    },
    sexo: {
      type: "text",
      value: "",
      required: true,
      name: "sexo",
    },
    telefono: {
      type: "text",
      value: "",
      required: true,
      name: "telefono",
    },
    correo: {
      type: "text",
      value: "",
      required: true,
      name: "correo",
    },
    calle: {
      type: "text",
      value: "",
      required: true,
      name: "calle",
    },
    numero: {
      type: "text",
      value: "",
      required: true,
      name: "numero",
    },
    comuna: {
      type: "text",
      value: "",
      required: true,
      name: "comuna",
    },
    region: {
      type: "text",
      value: "",
      required: true,
      name: "region",
    },
  };

  const { form, handleChange } = useForm({ initialData });

  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      label: "Información Personal",
    },
    {
      label: "Información de Contacto",
    },
    {
      label: "Resumen Registro",
    },
  ];

  const avanzar = () => {
    setActiveIndex((currIndex) => (currIndex < items.length - 1 ? currIndex + 1 : items.length - 1));
  };

  const retroceder = () => {
    setActiveIndex((currIndex) => (currIndex > 0 ? currIndex - 1 : 0));
  };

  return (
    <div className="card mt-2 flex flex-column" style={{ width: "100%" }}>
      <Steps model={items} activeIndex={activeIndex} />

      <div className="row flex justify-content-center mt-2">
        {activeIndex === 0 && <PersonalInformation form={form} handleChange={handleChange} />}
        {activeIndex === 1 && <ContactInformation form={form} handleChange={handleChange} />}
      </div>

      <div className="row flex justify-content-center mt-2 gap-4">
        {activeIndex > 0 && <Button label="Atrás" onClick={() => retroceder()}></Button>}
        {activeIndex < items.length - 1 && <Button label="Siguiente" onClick={() => avanzar()}></Button>}
        {activeIndex === items.length - 1 && <Button label="Registrar"></Button>}
      </div>
    </div>
  );
};
