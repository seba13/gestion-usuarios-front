import { Button } from "primereact/button";
import { useForm } from "../../../hooks/useForm";
import { FormData } from "../../../interfaces/formData";
import { Password } from "primereact/password";
import { FormEvent, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { UseNotification } from "../../../hooks/useNotification";

import notificationStyles from "../../../components/Notification/Notification.module.css";
import { Notification } from "../../../components/Notification/Notification";
import { FetchMethods, useFetch } from "../../../hooks/useFetch";
import { useContext } from "react";
const initialData: FormData = {
  password: {
    type: "password",
    value: "",
    required: true,
    name: "password",
    see: false,
  },
  repassword: {
    type: "password",
    value: "",
    required: true,
    name: "repassword",
    see: false,
  },
};

export const ChangePassword = () => {
  const { form, handleChange, errors } = useForm({ initialData });
  const [firstPressed, setFirstPressed] = useState(false);
  const { handleAddNotification, notifications, handleDeleteNotification, setTimeoutNotification } = UseNotification();

  const { usuario } = useContext(AuthContext)!;

  const { handleFetch } = useFetch();

  useEffect(() => {
    handleChange({
      value: "",
      type: "password",
      name: "password",
      required: true,
    });

    handleChange({
      value: "",
      type: "password",
      name: "repassword",
      required: true,
    });
  }, []);

  useEffect(() => {
    if (errors) {
      if (!errors["password"] && !errors["repassword"]) {
        if (!firstPressed) {
          setFirstPressed(true);
        }
      }
    }
  }, [errors]);

  const handleUpdatePassword = (e: FormEvent) => {
    e.preventDefault();

    if (!firstPressed) {
      setFirstPressed(true);
    }

    if (errors) {
      if (errors["password"] && errors["password"].required) {
        handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Password: " + errors["password"].required } });
        return;
      }

      if (errors["repassword"] && errors["repassword"].required) {
        handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Repassword: " + errors["repassword"].required } });
        return;
      }
    }

    if (form.password.value !== form.repassword.value) {
      handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Contraseñas no coinciden" } });
      return;
    }

    handleFetch({ url: `${import.meta.env.VITE_URL_API}usuario`, method: FetchMethods.PATCH, dataFetch: { usuario, contrasena: form.password.value } })
      .then((response) => {
        if (response.code === 200) {
          handleAddNotification({ propNotification: { id: Date.now(), type: "success", message: "Contraseña actualizada con éxito" } });
        }
      })
      .catch(() => {
        handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Error al actualizar contraseña" } });
      });
  };

  const setValue = (value: string, name: string, type: string, required: boolean) => {
    handleChange({
      value,
      type,
      name,
      required,
    });
  };

  return (
    <div className="card flex justify-content-center mt-4">
      <form className="flex flex-column gap-2 ml-4">
        <label htmlFor="password">Contraseña: </label>
        <Password
          toggleMask
          feedback={false}
          id="password"
          name="password"
          value={form.password.value}
          onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, true)}
          invalid={firstPressed && errors && errors.password ? true : false || false}
        />

        <label htmlFor="repassword">Confirmar contraseña: </label>
        <Password
          toggleMask
          feedback={false}
          id="repassword"
          name="repassword"
          value={form.repassword.value}
          onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, true)}
          invalid={firstPressed && errors && errors.repassword ? true : false || false}
        />

        <Button label="Actualizar Contraseña" onClick={(e) => handleUpdatePassword(e)}></Button>
      </form>

      <div className={notificationStyles["container-notifications"]}>
        {notifications.map((notification) => {
          setTimeoutNotification(notification.id, 4250);

          return <Notification key={notification.id} propNotification={notification} onClose={() => handleDeleteNotification(notification.id)} />;
        })}
      </div>
    </div>
  );
};
