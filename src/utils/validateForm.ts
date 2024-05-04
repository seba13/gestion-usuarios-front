import { InputAttr } from "../interfaces/formData";

export interface PropError {
  [name: string]: string | null; //error requrired / maxlength /minglength
}

export interface InputError {
  [name: string]: PropError | null;
}

const validateInput = {
  text: (input: InputAttr): PropError | null => {
    let inputErrors: PropError | null = null;

    console.log({ InputValue: input.value });

    if (input.required && input.value.trim().length === 0) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Campo requerido";
    }

    if (input.maxLength && input.value.trim().length > input.maxLength) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Largo superior al máximo";
    }

    if (input.minLength && input.value.trim().length < input.minLength) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Largo inferior al mínimo";
    }

    return inputErrors;
  },

  password: (input: InputAttr): PropError | null => {
    let inputErrors: PropError | null = null;

    if (input.required && input.value.trim().length === 0) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Campo requerido";
    }

    if (input.maxLength && input.value.trim().length > input.maxLength) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Largo superior al máximo";
    }

    if (input.minLength && input.value.trim().length < input.minLength) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Largo inferior al mínimo";
    }

    return inputErrors;
  },
  email: (input: InputAttr): PropError | null => {
    let inputErrors: PropError | null = null;

    if (input.required && input.value.trim().length === 0) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Campo requerido";
    }

    if (input.maxLength && input.value.trim().length > input.maxLength) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Largo superior al máximo";
    }

    if (input.minLength && input.value.trim().length < input.minLength) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Largo inferior al mínimo";
    }

    if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value)) {
      inputErrors = inputErrors ? inputErrors : {};
      inputErrors.validation = "Email inválido";
    }

    return inputErrors;
  },
  number: (input: InputAttr): PropError | null => {
    let inputErrors: PropError | null = null;

    if (input.required && (!input.value || input.value.toString().trim().length === 0)) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Campo requerido";
    }

    if (input.maxLength && input.value.toString().trim().length > input.maxLength) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Largo superior al máximo";
    }

    if (input.minLength && input.value.toString().trim().length < input.minLength) {
      inputErrors = inputErrors ? inputErrors : {};

      inputErrors.required = "Largo inferior al mínimo";
    }

    return inputErrors;
  },
};

export const validateForm = (input: InputAttr): InputError => {
  if (input.name) {
    const errors: InputError = { [input.name]: null };

    if (input.type === "text" || input.type === "password" || input.type === "email" || input.type === "number") {
      errors[input.name] = validateInput[input.type](input);
    }

    return errors;
  }

  return {};
};
