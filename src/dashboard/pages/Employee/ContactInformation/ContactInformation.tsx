import { InputText } from "primereact/inputtext";
import { FormData, InputAttr } from "../../../../interfaces/formData";

export const ContactInformation = ({ form, handleChange }: { form: FormData; handleChange: (inputAttr: InputAttr) => void }) => {
  const setValue = (value: string, name: string, type: string) => {
    handleChange({
      name,
      value,
      type,
    });
  };

  return (
    <div className="card flex flex-column ">
      <label htmlFor="correo">Correo: </label>
      <InputText id="correo" name="correo" value={form.correo.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="telefono">Teléfono: </label>
      <InputText id="telefono" name="telefono" value={form.telefono.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="calle">Calle: </label>
      <InputText id="calle" name="calle" value={form.calle.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="numero">Número: </label>
      <InputText id="numero" name="numero" value={form.numero.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />
    </div>
  );
};
