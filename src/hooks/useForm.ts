import { FormEvent, useState } from "react";
import { FormData, InputAttr } from "../interfaces/formData";

export const UseForm = ({ initialData, url }: { initialData: FormData; url: string }) => {
  const [form, setForm] = useState<FormData>(initialData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("submit:", url);
  };

  const handleChange = (input: { [name: string]: InputAttr }) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        ...input,
      };
    });
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
};
