import { InputText } from "primereact/inputtext";
// import { Employee } from "../../../../interfaces/Employees";
import { FormData, InputAttr } from "../../../../interfaces/formData";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Nullable } from "primereact/ts-helpers";

export const PersonalInformation = ({ form, handleChange }: { form: FormData; handleChange: (inputAttr: InputAttr) => void }) => {
  const optionEstadoCivil = [
    { name: "Soltero(a)", value: "s" },
    { name: "Casado(a)", value: "c" },
    { name: "Divorciado(a)", value: "d" },
    { name: "Viudo(a)", value: "v" },
  ];

  const optionSexo = [
    { name: "Masculino", value: "m" },
    { name: "Femenino", value: "f" },
  ];

  const setValue = (value: string, name: string, type: string) => {
    handleChange({
      name,
      value,
      type,
    });
  };

  const setDate = (value: Nullable<Date>, name: string, type: string) => {
    handleChange({
      name,
      value: value?.toISOString() || "",
      type,
    });
  };

  const handlerSelect = (value: string, name: string, type: string) => {
    console.log(value);

    handleChange({
      name,
      value: value,
      type,
    });

    // setSelectedCity(value);
  };

  return (
    <div className="card flex flex-column">
      <label htmlFor="rut">rut: </label>
      <InputText id="rut" name="rut" value={form.rut.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="dv">dv: </label>
      <InputText id="dv" name="dv" value={form.dv.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="nombre">Nombre: </label>
      <InputText id="nombre" name="nombre" value={form.nombre.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="paterno">Apellido Paterno: </label>
      <InputText id="paterno" name="paterno" value={form.paterno.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="materno">Apellido Materno: </label>
      <InputText id="materno" name="materno" value={form.materno.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="profesion">Profesión: </label>
      <InputText id="profesion" name="profesion" value={form.profesion.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type)} />

      <label htmlFor="fecNac">Fecha Nacimiento: </label>
      <Calendar value={new Date(form.fecNac.value)} name="fecNac" onChange={(e) => setDate(e.value, e.target.name, "text")} showIcon dateFormat="dd/mm/yy" />

      <label htmlFor="estadoCivil">Estado Civil: </label>
      <Dropdown
        value={form.estadoCivil.value}
        name="estadoCivil"
        id="estadoCivil"
        onChange={(e) => handlerSelect(e.target.value, e.target.name, "text")}
        options={optionEstadoCivil}
        optionLabel="name"
        placeholder="Seleccione estado civil"
        className="w-full md:w-14rem"
      />

      <label htmlFor="sexo">Sexo: </label>
      <Dropdown value={form.sexo.value} name="sexo" id="sexo" onChange={(e) => handlerSelect(e.target.value, e.target.name, "text")} options={optionSexo} optionLabel="name" placeholder="Seleccione sexo" className="w-full md:w-14rem" />
    </div>
  );
};
