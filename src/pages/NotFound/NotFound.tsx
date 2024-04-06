import { useNavigate } from "react-router-dom";

import { InputForm } from "../../components";
import styles from "./NotFound.module.css";
import { FormData } from "../../interfaces/formData";
import { useForm } from "../../hooks/useForm";

const initialData: FormData = {
  "submit-btn": {
    type: "submit",
    value: "VOLVER ATRÁS",
  },
};

export const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateError = () => {
    navigate("/");
  };

  const { form } = useForm({ initialData });
  return (
    <div className={`${styles.container} animate__animated animate__fadeIn`}>
      <h1>NO ENCONTRADO 404</h1>

      <InputForm type="submit" name="submit-btn" onClick={handleNavigateError} form={form} />
    </div>
  );
};
