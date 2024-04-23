import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { InputForm } from "../../components/InputForm/InputForm";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { FormData } from "../../interfaces/formData";
import styles from "./FormLogin.module.css";
import notifactionStyles from "../../components/Notification/Notification.module.css";
import { useContext } from "react";

import { FetchMethods, useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import { Notification } from "../../components/Notification/Notification";
import { UseNotification } from "../../hooks/useNotification";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
// import { FormEvent } from "react";

const initialData: FormData = {
  username: {
    type: "text",
    value: "",
    required: true,
    name: "username",
  },
  password: {
    type: "password",
    value: "",
    required: true,
    name: "password",
    see: false,
  },
};

export const FormLogin = () => {
  const { handleChangeToken } = useContext(AuthContext)!;

  const navigate = useNavigate();
  const { form, handleChange, validateAttempts, attempts, errors, handleBlur, handleError } = useForm({
    initialData,
    // url: "http://localhost/",
    maxAttempts: 3,
  });

  const { handleAddNotification, notifications, handleDeleteNotification, setTimeoutNotification } = UseNotification();

  const { loading, setLoading, data, handleFetch } = useFetch({ method: FetchMethods.POST });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleError(form.username);
    handleError(form.password);

    if (errors && (errors["username"] || errors["password"])) {
      // llamar al componente notificacion
      handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Campo requerido" } });
      return;
    }

    if (form.username.value.trim().length === 0 || form.password.value.trim().length === 0) {
      // campo requerido notificacion
      handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Campo requerido" } });
      return;
    }

    if (data.loading === false) {
      if (validateAttempts()) {
        setLoading(true);
        handleFetch({
          dataFetch: {
            usuario: form.username.value,
            contrasena: form.password.value,
          },
          url: "http://localhost:80/auth-user",
        });
      }

      // fetch
      // navigate("/");
    }
  };

  useEffect(() => {
    setLoading(false);
    if (data && !data.error) {
      if (data.data) {
        console.log("aca");
        const { data: fechData } = data;

        if (fechData.code === 200) {
          handleChangeToken();
          navigate("/");
        }
      }
      return;
    }

    if (data.error) {
      console.log("aca222");
      handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: data.error } });
      return;
    }
  }, [data]);

  return (
    <div className={`${styles["container-login"]} animate__animated animate__fadeIn`}>
      {loading && <LoadingSpinner />}
      <form className={`${styles["form-login"]}`} onSubmit={onSubmit}>
        <h1 className={styles["form-title"]}>INICIAR SESIÓN</h1>
        <div className={`${styles["form-group"]} ${styles["form-group__df"]} ${styles["form-group__column"]} ${styles["form-group__fg1"]}`}>
          <div className={`${styles["form-group"]} ${styles["form-group__df"]} ${styles["form-group__column"]} ${styles["form-group__mb1"]}`}>
            <div className={`${styles["form-group"]} ${styles["form-group__df"]}`}>
              <InputForm
                placeholder="Usuario"
                type="text"
                autocomplete="off"
                maxLength={20}
                // classes={["form-input", "form-input__text"]}
                name="username"
                form={form}
                // required={true}
                onBlur={handleBlur}
                error={(errors && errors["username"] && true) || false}
                onChange={handleChange}></InputForm>
            </div>

            <div className={`${styles["form-group"]} ${styles["form-group__df"]}`}>
              <InputForm placeholder="Contraseña" type="password" autocomplete="off" maxLength={20} name="password" onBlur={handleBlur} form={form} error={(errors && errors["password"] && true) || false} onChange={handleChange}></InputForm>
            </div>
          </div>

          <div className={`${styles["form-group"]} ${styles["form-group__df"]}`}>
            <InputForm type="submit" name="submit-btn" disabled={attempts === 0} value="INICIAR SESIÓN" />
          </div>
          <div className={`${styles["form-group"]} ${styles["form-group__df"]}`}>
            {/* cambiar despues a navlink */}
            <a className={styles.anchor}>¿OLVIDASTE TU CONTRASEÑA?</a>
          </div>
        </div>
      </form>
      <div className={styles["container-bg"]}>
        <img src="/assets/images/bg.png" alt="imagen login" />
      </div>

      <div className={notifactionStyles["container-notifications"]}>
        {notifications.map((notification) => {
          setTimeoutNotification(notification.id, 4250);

          return <Notification key={notification.id} propNotification={notification} onClose={() => handleDeleteNotification(notification.id)} />;
        })}
      </div>

      {<Outlet />}
    </div>
  );
};
