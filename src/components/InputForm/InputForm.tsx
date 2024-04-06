import { ChangeEvent } from "react";
import { FormData, InputAttr } from "../../interfaces/formData";
import styles from "./InputForm.module.css";
interface InputForm {
  type: string;
  placeholder?: string;
  id?: string;
  name?: string;
  error?: boolean;
  autocomplete?: string;
  required?: boolean;
  addClasses?: string[];
  onChange?: (input: InputAttr) => void;
  onBlur?: (input: InputAttr) => void;
  onClick?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
  form?: FormData;
  maxLength?: number;
}

export const InputForm = ({ error = false, name = "", type, placeholder, onChange, onClick, id, form, required = false, disabled, maxLength, onBlur, addClasses }: InputForm) => {
  const defaultClasses = (): string[] => {
    const defaultClasses: { [name: string]: string[] } = {
      text: ["form-input", "form-input__text"],
      password: ["form-input", "form-input__text"],
      submit: ["form-input", "form-input__submit"],
      button: ["form-input", "form-input__submit"],
      /*
        radio
        checkbox
        ...
      */
    };

    let classes = [...defaultClasses[type], ...(addClasses || [])];

    if (error) {
      classes = [...classes, "form-input__error"];
    }

    if (disabled) {
      classes = [...classes, "form-input__disabled"];
    }

    return classes.map((className) => {
      return styles[className];
    });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const input: {
      [name: string]: InputAttr;
    } = {
      [name]: {
        type,
        value: e.target.value.trim().substring(0, maxLength),
        required: (form && form[name].required) || required,
        name,
      },
    };

    onBlur && onBlur(input[name]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: {
      [name: string]: InputAttr;
    } = {
      [name]: {
        type,
        value: e.target.value.trim().substring(0, maxLength),
        required: (form && form[name].required) || required,
        name,
      },
    };

    onChange && onChange(input[name]);
  };

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <input
      type={type}
      name={name}
      value={form && form[name] && form[name].value}
      id={id && id}
      className={defaultClasses().join(" ")}
      placeholder={placeholder}
      maxLength={maxLength && maxLength}
      disabled={disabled && disabled}
      required={required && required}
      onChange={onChange && handleChange}
      onBlur={onBlur && handleBlur}
      onClick={handleClick}></input>
  );
};
