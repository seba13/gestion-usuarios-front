import { useNavigate, useParams } from "react-router-dom";
import { FetchMethods, useFetch } from "../../../hooks/useFetch";
import { FormEvent, useEffect, useState } from "react";
import { Employee as IEmployee } from "../../../interfaces/Employees";
import { TabMenu } from "primereact/tabmenu";

import { arrProvincias } from "../../../utils/getLocationData";

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
import { UseNotification } from "../../../hooks/useNotification";

import notificationStyles from "../../../components/Notification/Notification.module.css";
import { Notification } from "../../../components/Notification/Notification";
import { EmployeeLetterGenerator } from "./EmployeeLetterGenerator/EmployeeLetterGenerator";
import { ListEmployeeLetter } from "./ListEmployeeLetter/ListEmployeeLetter";

export const Employee = () => {
  const navigate = useNavigate();
  const { rut = "" } = useParams();
  const { handleFetch } = useFetch();
  const [empleado, setEmpleado] = useState<IEmployee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { handleAddNotification, notifications, handleDeleteNotification, setTimeoutNotification } = UseNotification();

  //   const subPages = [PersonalInformation, ContactInformation];

  const initialData: FormData = {
    idEmpleado: {
      type: "text",
      value: empleado?.idEmpleado || "",
      required: true,
      name: "idEmpleado",
    },

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

    cargo: {
      type: "text",
      value: empleado?.idCargo || "",
      required: true,
      name: "cargo",
    },

    estado: {
      type: "text",
      value: empleado?.estado || "",
      required: true,
      name: "estado",
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
      type: "email",
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
      type: "number",
      value: empleado?.idComuna || "",
      required: true,
      name: "comuna",
    },
    region: {
      type: "number",
      value: empleado?.idRegion || "",
      required: true,
      name: "region",
    },
    provincia: {
      type: "number",
      value: empleado?.idProvincia || "",
      required: true,
      name: "provincia",
    },
  };

  const { form, handleChange, errors } = useForm({ initialData });

  const items = [
    { label: "Información Personal", icon: "pi pi-home" },
    { label: "Información de Contacto", icon: "pi pi-chart-line" },
    { label: "Crear Cartas", icon: "pi pi-chart-line" },
    { label: "Descargar Cartas", icon: "pi pi-chart-line" },
  ];

  useEffect(() => {
    handleFetch({ url: `${import.meta.env.VITE_URL_API}empleado/rut/${rut}`, method: FetchMethods.GET })
      .then((data) => {
        console.log("aca");
        console.log(data);

        if (data.code === 200) {
          const empleado = data.message as IEmployee;

          setEmpleado({
            idEmpleado: empleado.idEmpleado,
            rut: empleado.rut,
            dv: empleado.dv,
            nombre: empleado.nombre,
            paterno: empleado.paterno,
            materno: empleado.materno,
            fecNac: empleado.fecNac,
            profesion: empleado.profesion,
            idCargo: empleado.idCargo,
            cargo: empleado.cargo,
            estadoCivil: empleado.estadoCivil,
            telefono: empleado.telefono,
            correo: empleado.correo,
            sexo: empleado.sexo === "m" ? "Masculino" : "Femenino",
            idRegion: empleado.idRegion,
            region: empleado.region,
            idProvincia: empleado.idProvincia,
            provincia: arrProvincias.filter((provincia) => provincia.idProvincia === parseInt(empleado.idProvincia))[0].nombreProvincia,
            idComuna: empleado.idComuna,
            comuna: empleado.comuna,
            calle: empleado.calle,
            numero: empleado.numero,
            fecIngreso: empleado.fecIngreso,
            fecDespido: empleado.fecDespido,
            idEstado: empleado.idEstado,
            estado: empleado.estado,
          } as IEmployee);
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
        name: "idEmpleado",
        value: empleado.idEmpleado,
        type: "text",
      });

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
        name: "cargo",
        value: empleado.idCargo,
        type: "number",
      });

      handleChange({
        name: "estado",
        value: empleado.idEstado,
        type: "text",
      });

      handleChange({
        name: "sexo",
        value: empleado.sexo,
        type: "text",
      });

      handleChange({
        name: "region",
        value: empleado.idRegion,
        type: "number",
      });

      handleChange({
        name: "provincia",
        value: empleado.idProvincia,
        type: "number",
      });

      handleChange({
        name: "comuna",
        value: empleado.idComuna,
        type: "number",
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
        type: "email",
      });
    }
  }, [empleado]);

  const handleUpdateEmployee = (e: FormEvent) => {
    e.preventDefault();

    if (errors) {
      for (const key in errors) {
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
    }

    console.log({
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
      idEmpleado: form.idEmpleado.value,
    });

    handleFetch({
      url: `${import.meta.env.VITE_URL_API}empleado`,
      method: FetchMethods.PATCH,
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
        idEmpleado: form.idEmpleado.value,
      },
    }).then((response) => {
      if (response.code === 200) {
        handleAddNotification({ propNotification: { id: Date.now(), type: "success", message: "Empleado actualizado con éxito" } });
      } else {
        handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Error al actualizar empleado" } });
      }

      setIsLoading(false);
    });
  };

  return (
    <div style={{ zIndex: -1, flexGrow: 1 }}>
      {isLoading && <LoadingSpinner />}

      <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />

      {empleado && (
        <form className="align-self-start m-4">
          {/* {subPages[activeIndex]({ form, handleChange })} */}

          {activeIndex === 0 && <PersonalInformation form={form} handleChange={handleChange} errors={errors} firstPressed={{ first: true, second: true }} />}
          {activeIndex === 1 && <ContactInformation form={form} handleChange={handleChange} errors={errors} firstPressed={{ first: true, second: true }} />}

          {(activeIndex === 0 || activeIndex === 1) && <Button label="Guardar" className="mt-4" onClick={(e) => handleUpdateEmployee(e)} />}
        </form>
      )}

      {empleado && activeIndex === 2 && <EmployeeLetterGenerator empleado={empleado} />}
      {empleado && activeIndex === 3 && <ListEmployeeLetter rut={empleado.rut} />}

      <div className={notificationStyles["container-notifications"]}>
        {notifications.map((notification) => {
          setTimeoutNotification(notification.id, 4250);

          return <Notification key={notification.id} propNotification={notification} onClose={() => handleDeleteNotification(notification.id)} />;
        })}
      </div>
    </div>
  );

  //   return (
  //     <>
  //       {isLoading && <p>cargando</p>}

  //       {empleado && <div>Employee {empleado.rut}</div>}
  //     </>
  //   );
};
