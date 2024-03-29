import { ChangeEvent } from "react";
import styles from "./InputForm.module.css";
import { FormData, InputAttr } from "../../interfaces/formData";
interface InputForm {
  type: string;
  placeholder?: string;
  id?: string;
  name: string;
  autocomplete?: string;
  required?: boolean;
  classes?: string[];
  onChange?: (input: { [name: string]: InputAttr }) => void;
  onSubmit?: () => void;
  form?: FormData;
}

export const InputForm = ({ classes, name, type, placeholder, onChange, id, form, required }: InputForm) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: {
      [name: string]: InputAttr;
    } = {
      [name]: {
        type,
        value: e.target.value,
        required: required || false,
      },
    };

    onChange && onChange(input);
  };

  return (
    <input
      type={type}
      // name={name}
      value={form && form[name] && form[name].value}
      id={id && id}
      className={classes && classes.length ? `${classes.map((nombreClase) => styles[nombreClase]).join(" ")}` : ""}
      placeholder={placeholder}
      onChange={handleChange}></input>
  );
};
