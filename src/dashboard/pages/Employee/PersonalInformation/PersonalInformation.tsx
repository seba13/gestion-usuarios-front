import { InputText } from "primereact/inputtext";
// import { Employee } from "../../../../interfaces/Employees";
import { FormData, InputAttr } from "../../../../interfaces/formData";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Nullable } from "primereact/ts-helpers";
import { InputError } from "../../../../utils/validateForm";

export const PersonalInformation = ({
  form,
  handleChange,
  errors,

  firstPressed,
}: {
  form: FormData;
  handleChange: (inputAttr: InputAttr) => void;
  errors: InputError | undefined;

  firstPressed: { first: boolean; second: boolean };
}) => {
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

  const optionCargo = [
    { name: "Frontend", value: 1 },
    { name: "Backend", value: 2 },
    { name: "DB Admin", value: 3 },
    { name: "Testing", value: 4 },
    { name: "QA", value: 5 },
    { name: "Jefe Proyecto", value: 6 },
    { name: "Desarrollador", value: 7 },
    { name: "Programador", value: 8 },
  ];

  const optionEstados = [
    { name: "Vigente", value: "f0324771-ebbd-11ee-aa6b-7c4d8fb9ed51" },
    { name: "Vacaciones", value: "f0325421-ebbd-11ee-aa6b-7c4d8fb9ed51" },
    { name: "Licencia", value: "f0325578-ebbd-11ee-aa6b-7c4d8fb9ed51" },
    { name: "Despedido", value: "f03255e0-ebbd-11ee-aa6b-7c4d8fb9ed51" },
    { name: "Inhabilitado", value: "f8782666-ebbd-22uu-nn87-7c4d8fb9ed51" },
  ];

  const setValue = (value: string, name: string, type: string, required: boolean) => {
    console.log(errors);

    handleChange({
      name,
      value,
      type,
      required,
    });
  };

  const setDate = (value: Nullable<Date>, name: string, type: string, required: boolean) => {
    handleChange({
      name,
      value: value?.toISOString() || "",
      type,
      required,
    });
  };

  const handlerSelect = (value: string, name: string, type: string, required: boolean) => {
    console.log(value);

    handleChange({
      name,
      value: value,
      type,
      required,
    });

    // setSelectedCity(value);
  };

  const setRut = (value: string, name: string, type: string, required: boolean) => {
    console.log(value);

    handleChange({
      name,
      value,
      type,
      required,
    });

    // setDV(value);
  };

  return (
    <div className="card flex flex-column ">
      <div className="form-group">
        <label htmlFor="rut">rut: </label>
        <InputText
          id="rut"
          name="rut"
          value={form.rut.value}
          onChange={(e) => setRut(e.target.value, e.target.name, e.target.type, e.target.required)}
          required={true}
          invalid={firstPressed.first && errors && errors.rut ? true : false || false}
          keyfilter="int"
        />

        <label htmlFor="dv">dv: </label>
        <InputText id="dv" name="dv" value={form.dv.value} onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, e.target.required)} required={true} invalid={firstPressed.first && errors && errors.dv ? true : false || false} />
      </div>

      <label htmlFor="nombre">Nombre: </label>
      <InputText
        id="nombre"
        name="nombre"
        value={form.nombre.value}
        onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, e.target.required)}
        required={true}
        invalid={firstPressed.first && errors && errors.nombre ? true : false || false}
      />

      <label htmlFor="paterno">Apellido Paterno: </label>
      <InputText
        id="paterno"
        name="paterno"
        value={form.paterno.value}
        onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, e.target.required)}
        required={true}
        invalid={firstPressed.first && errors && errors.paterno ? true : false || false}
      />

      <label htmlFor="materno">Apellido Materno: </label>
      <InputText
        id="materno"
        name="materno"
        value={form.materno.value}
        onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, e.target.required)}
        required={true}
        invalid={firstPressed.first && errors && errors.materno ? true : false || false}
      />

      <label htmlFor="profesion">Profesión: </label>
      <InputText
        id="profesion"
        name="profesion"
        value={form.profesion.value}
        onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, e.target.required)}
        required={true}
        invalid={firstPressed.first && errors && errors.profesion ? true : false || false}
      />

      <label htmlFor="fecNac">Fecha Nacimiento: </label>
      <Calendar
        value={form.fecNac.value !== "" ? new Date(form.fecNac.value) : null}
        name="fecNac"
        onChange={(e) => setDate(e.value, e.target.name, "text", true)}
        showIcon
        dateFormat="dd/mm/yy"
        invalid={firstPressed.first && errors && errors.fecNac ? true : false || false}
      />

      <label htmlFor="estadoCivil">Estado Civil: </label>
      <Dropdown
        value={form.estadoCivil.value}
        name="estadoCivil"
        id="estadoCivil"
        onChange={(e) => handlerSelect(e.target.value, e.target.name, "text", true)}
        options={optionEstadoCivil}
        optionLabel="name"
        placeholder="Seleccione estado civil"
        className="w-full md:w-14rem"
        required={true}
        invalid={firstPressed.first && errors && errors.estadoCivil ? true : false || false}
      />

      <label htmlFor="cargo">Cargo: </label>
      <Dropdown
        value={form.cargo.value}
        name="cargo"
        id="cargo"
        onChange={(e) => handlerSelect(e.target.value, e.target.name, "number", true)}
        options={optionCargo}
        optionLabel="name"
        placeholder="Seleccione cargo"
        className="w-full md:w-14rem"
        required={true}
        invalid={firstPressed.first && errors && errors.cargo ? true : false || false}
      />

      <label htmlFor="cargo">Estado: </label>
      <Dropdown
        value={form.estado.value}
        name="estado"
        id="estado"
        onChange={(e) => handlerSelect(e.target.value, e.target.name, "text", true)}
        options={optionEstados}
        optionLabel="name"
        placeholder="Seleccione estado"
        className="w-full md:w-14rem"
        required={true}
        invalid={firstPressed.first && errors && errors.estado ? true : false || false}
      />

      <label htmlFor="sexo">Sexo: </label>
      <Dropdown
        value={form.sexo.value}
        name="sexo"
        id="sexo"
        onChange={(e) => handlerSelect(e.target.value, e.target.name, "text", true)}
        options={optionSexo}
        optionLabel="name"
        placeholder="Seleccione sexo"
        className="w-full md:w-14rem"
        required={true}
        invalid={firstPressed.first && errors && errors.sexo ? true : false || false}
      />
    </div>
  );
};