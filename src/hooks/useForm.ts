import { useState } from "react";
import { FormData, InputAttr } from "../interfaces/formData";
import { InputError, validateForm } from "../utils/validateForm";
export const useForm = ({ initialData, maxAttempts = -1 }: { initialData: FormData; maxAttempts?: number }) => {
  const [form, setForm] = useState<FormData>(initialData);
  const [attempts, setAttempts] = useState(maxAttempts);
  const [errors, setErrors] = useState<InputError>();

  const handleBlur = (input: InputAttr) => {
    handleError(input);
  };

  const handleError = (input: InputAttr) => {
    const inputErrors = validateForm(input);

    setErrors((prevErrors = {}) => {
      return { ...prevErrors, ...inputErrors };
    });
  };

 

  const validateAttempts = (): boolean => {
    if (typeof maxAttempts === "number") {
      if (attempts !== -1) {
        if (attempts >= 1) {
          setAttempts((prevAttempts) => {
            return prevAttempts - 1;
          });

          return true;
        }

        return false;
      }

      return true;
    }

    return false;
  };

  const handleChange = (input: InputAttr) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [input.name!]: input,
      };
    });

    handleError(input);
  };

  return {
    form,
    errors,
    handleChange,
    validateForm,
    validateAttempts,
    attempts,
    handleBlur,
    handleError,
  };
};
