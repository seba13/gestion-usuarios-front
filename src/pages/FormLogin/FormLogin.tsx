import { InputForm } from "../../components/InputForm/InputForm";
import { UseForm } from "../../hooks/useForm";
import { FormData } from "../../interfaces/formData";
import styles from "./FormLogin.module.css";

const initialData: FormData = {
  username: {
    type: "text",
    value: "",
    required: true,
  },
  password: {
    type: "text",
    value: "",
    required: true,
  },
};

export const FormLogin = () => {
  const { form, handleChange, handleSubmit } = UseForm({ initialData, url: "http://localhost" });

  return (
    <div className={`${styles["container-login"]}`}>
      <form className={`${styles["form-login"]}`} onSubmit={handleSubmit}>
        <h1 className={styles["form-title"]}>INICIAR SESIÓN</h1>
        <div
          className={`${styles["form-group"]} ${styles["form-group__df"]} ${styles["form-group__column"]} ${styles["form-group__fg1"]}`}>
          <div
            className={`${styles["form-group"]} ${styles["form-group__df"]} ${styles["form-group__column"]} ${styles["form-group__mb1"]}`}>
            <div className={`${styles["form-group"]} ${styles["form-group__df"]}`}>
              <InputForm
                placeholder="Usuario"
                type="text"
                autocomplete="off"
                classes={["form-input", "form-input__text"]}
                name="username"
                form={form}
                required={true}
                onChange={handleChange}></InputForm>
            </div>

            <div className={`${styles["form-group"]} ${styles["form-group__df"]}`}>
              <InputForm
                placeholder="Password"
                type="password"
                autocomplete="off"
                classes={["form-input", "form-input__text"]}
                name="password"
                form={form}
                required={true}
                onChange={handleChange}></InputForm>
            </div>
          </div>

          <div className={`${styles["form-group"]} ${styles["form-group__df"]}`}>
            <InputForm type="submit" classes={["form-input", "form-input__submit"]} name="submit-btn" />
          </div>
          <div className={`${styles["form-group"]} ${styles["form-group__df"]}`}>
            {/* cambiar despues a navlink */}
            <a className={styles.paragraph}>¿OLVIDASTE TU CONTRASEÑA?</a>
          </div>
        </div>
      </form>
      <div className={styles["container-bg"]}>
        <img src="/assets/images/bg.png" alt="imagen login" />
      </div>
    </div>
  );
};
