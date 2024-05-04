import { Steps } from "primereact/steps";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { PersonalInformation } from "../Employee/PersonalInformation/PersonalInformation";
import { useForm } from "../../../hooks/useForm";
import { FormData } from "../../../interfaces/formData";
import { ContactInformation } from "../Employee/ContactInformation/ContactInformation";
import { UseNotification } from "../../../hooks/useNotification";

import notificationStyles from "../../../components/Notification/Notification.module.css";
import { Notification } from "../../../components/Notification/Notification";
import { FetchMethods, useFetch } from "../../../hooks/useFetch";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export const FormEmployee = () => {
  const { handleAddNotification, notifications, handleDeleteNotification, setTimeoutNotification } = UseNotification();
  const initialData: FormData = {
    rut: {
      type: "text",
      value: "",
      required: true,
      name: "rut",
    },
    dv: {
      type: "text",
      value: "",
      required: true,
      name: "dv",
    },
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
    fecNac: {
      type: "text",
      value: "",
      required: true,
      name: "fecNac",
    },

    estadoCivil: {
      type: "text",
      value: "",
      required: true,
      name: "estadoCivil",
    },
    cargo: {
      type: "number",
      value: "",
      required: true,
      name: "cargo",
    },

    estado: {
      type: "text",
      value: "",
      required: true,
      name: "estado",
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
      type: "email",
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
      type: "number",
      value: "",
      required: true,
      name: "comuna",
    },
    region: {
      type: "number",
      value: "",
      required: true,
      name: "region",
    },
    provincia: {
      type: "number",
      value: "",
      required: true,
      name: "provincia",
    },
  };

  const { form, handleChange, errors } = useForm({ initialData });

  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstPressed, setFirstPressed] = useState<{ first: boolean; second: boolean }>({ first: false, second: false });

  const [isLoading, setIsLoading] = useState(false);

  const items = [
    {
      label: "Información Personal",
    },
    {
      label: "Información de Contacto",
    },
  ];

  const onChangeInputs = () => {
    handleChange({
      name: "rut",
      value: form.rut.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "dv",
      value: form.dv.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "nombre",
      value: form.nombre.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "paterno",
      value: form.paterno.value,
      type: "text",
      required: true,
    });
    handleChange({
      name: "materno",
      value: form.materno.value,
      type: "text",
      required: true,
    });
    handleChange({
      name: "profesion",
      value: form.profesion.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "fecNac",
      value: form.fecNac.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "estadoCivil",
      value: form.estadoCivil.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "cargo",
      value: form.cargo.value,
      type: "number",
      required: true,
    });

    handleChange({
      name: "estado",
      value: form.estado.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "sexo",
      value: form.sexo.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "correo",
      value: form.correo.value,
      type: "email",
      required: true,
    });
    handleChange({
      name: "telefono",
      value: form.telefono.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "calle",
      value: form.calle.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "numero",
      value: form.numero.value,
      type: "text",
      required: true,
    });

    handleChange({
      name: "region",
      value: form.region.value,
      type: "number",
      required: true,
    });

    handleChange({
      name: "provincia",
      value: form.provincia.value,
      type: "number",
      required: true,
    });

    handleChange({
      name: "comuna",
      value: form.comuna.value,
      type: "number",
      required: true,
    });
  };

  useEffect(() => {
    if (errors) {
      if (!errors["rut"] && !errors["nombre"] && !errors["paterno"] && !errors["materno"] && !errors["profesion"] && !errors["fecNac"] && !errors["estadoCivil"] && !errors["cargo"] && !errors["estado"] && !errors["sexo"]) {
        setFirstPressed({ first: true, second: false });
      }

      if (!errors["correo"] && !errors["telefono"] && !errors["calle"] && !errors["numero"] && !errors["region"] && !errors["provincia"] && !errors["comuna"]) {
        setFirstPressed({ first: true, second: true });
      }
    }
  }, [errors]);

  useEffect(() => {
    onChangeInputs();
  }, []);

  // useEffect(() => {
  //   if (activeIndex === 1) {
  //     if (errors) {
  //       errors["correo"] = null;
  //       errors["telefono"] = null;
  //       errors["calle"] = null;
  //       errors["provincia"] = null;
  //       errors["numero"] = null;
  //       errors["comuna"] = null;
  //       errors["region"] = null;
  //     }
  //     // setFirstPressed(false);
  //   }
  // }, [activeIndex]);

  const validarInput = () => {
    for (const key in errors) {
      if (activeIndex === 0) {
        if (!errors["rut"] && !errors["nombre"] && !errors["paterno"] && !errors["materno"] && !errors["profesion"] && !errors["fecNac"] && !errors["estadoCivil"] && !errors["cargo"] && !errors["estado"] && !errors["sexo"]) {
          setFirstPressed({ first: true, second: false });
          return true;
        }

        if (errors[key]) {
          if (errors[key]?.required) {
            console.log(key + ": " + errors[key]?.required);

            handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: key + ": " + errors[key]?.required } });
            return;
          }

          if (errors[key]?.validation) {
            console.log(key + ": " + errors[key]?.required);

            handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: key + ": " + errors[key]?.validation } });
            return;
          }
        }
      }

      if (activeIndex === 1) {
        if (errors[key]) {
          if (!errors["correo"] && !errors["telefono"] && !errors["calle"] && !errors["numero"] && !errors["region"] && !errors["provincia"] && !errors["comuna"]) {
            setFirstPressed({ first: true, second: true });
            return true;
          }

          if (errors[key]?.required) {
            console.log(key + ": " + errors[key]?.required);

            handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: key + ": " + errors[key]?.required } });
            return;
          }

          if (errors[key]?.validation) {
            console.log(key + ": " + errors[key]?.required);

            handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: key + ": " + errors[key]?.validation } });
            return;
          }
        }
      }
    }

    return true;
  };

  const avanzar = () => {
    if (!firstPressed.first) {
      setFirstPressed({ first: true, second: false });
    }

    if (validarInput() && firstPressed.first) {
      setActiveIndex((currIndex) => (currIndex < items.length ? currIndex + 1 : items.length - 1));
    }
  };
  const retroceder = () => {
    setActiveIndex((currIndex) => (currIndex > 0 ? currIndex - 1 : 0));
  };

  const handleSaveEmployee = () => {
    if (!firstPressed.second) {
      setFirstPressed({ first: true, second: true });
    }

    if (validarInput() && firstPressed) {
      setIsLoading(true);

      console.log(form);

      handleFetch({
        url: `${import.meta.env.VITE_URL_API}empleado`,
        method: FetchMethods.POST,
        dataFetch: {
          nombre: form.nombre.value,
          paterno: form.paterno.value,
          materno: form.materno.value,
          fecNac: form.fecNac.value,
          rut: form.rut.value,
          dv: form.dv.value,
          sexo: form.sexo.value,
          estadoCivil: form.estadoCivil.value,
          correo: form.correo.value,
          calle: form.calle.value,
          numero: form.numero.value,
          telefono: form.telefono.value,
          region: form.region.value,
          comuna: form.comuna.value,
          cargo: form.cargo.value,
          profesion: form.profesion.value,
          estado: form.estado.value,
        },
      }).then((response) => {
        if (response.code === 200) {
          handleAddNotification({ propNotification: { id: Date.now(), type: "success", message: "Empleado registrado con éxito" } });

          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Error al registrar empleado" } });
        }

        setIsLoading(false);
      });
    }
  };

  return (
    <div className="card mt-2 flex flex-column" style={{ width: "100%" }}>
      {isLoading && <LoadingSpinner />}
      <Steps model={items} activeIndex={activeIndex} />

      <div className="row flex justify-content-center mt-2">
        {activeIndex === 0 && <PersonalInformation form={form} handleChange={handleChange} errors={errors} firstPressed={firstPressed} />}
        {activeIndex === 1 && <ContactInformation form={form} handleChange={handleChange} errors={errors} firstPressed={firstPressed} />}
      </div>

      <div className="row flex justify-content-center mt-2 gap-4">
        {activeIndex > 0 && <Button label="Atrás" onClick={() => retroceder()}></Button>}
        {activeIndex < items.length - 1 && <Button label="Siguiente" onClick={() => avanzar()}></Button>}
        {activeIndex === items.length - 1 && <Button label="Registrar" onClick={() => handleSaveEmployee()}></Button>}
      </div>

      <div className={notificationStyles["container-notifications"]}>
        {notifications.map((notification) => {
          setTimeoutNotification(notification.id, 4250);

          return <Notification key={notification.id} propNotification={notification} onClose={() => handleDeleteNotification(notification.id)} />;
        })}
      </div>
    </div>
  );
};
