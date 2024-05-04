import { InputText } from "primereact/inputtext";
import { FormData, InputAttr } from "../../../../interfaces/formData";
import { Dropdown } from "primereact/dropdown";
// import { FetchMethods, useFetch } from "../../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { arrRegiones, filtrarProvincias, filtrarComunas } from "../../../../utils/getLocationData";
import { InputError } from "../../../../utils/validateForm";

export const ContactInformation = ({
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
  const optionRegiones = arrRegiones;

  const [optionPronvicias, setOptionPronvicias] = useState<{ provincia: string; value: number }[]>();
  const [optionComunas, setOptionComunas] = useState<{ comuna: string; value: number }[]>();

  //   const { handleFetch } = useFetch();

  const setValue = (value: string, name: string, type: string, required: boolean) => {
    handleChange({
      name,
      value,
      type,
      required,
    });
  };

  const handlerSelect = (value: string, name: string, type: string, required: boolean) => {
    if (name === "region") {
      handleChange({
        name: "provincia",
        value: "",
        type,
        required,
      });
      handleChange({
        name: "comuna",
        value: "",
        type,
        required,
      });

      setOptionComunas(undefined);
    }

    if (name === "provincia") {
      handleChange({
        name: "comuna",
        value: "",
        type,
        required,
      });
    }

    handleChange({
      name,
      value,
      type,
      required,
    });
  };

  useEffect(() => {
    const idRegion = parseInt(form.region.value);

    if (!isNaN(idRegion)) {
      setOptionPronvicias(filtrarProvincias(idRegion));
    }
  }, [form.region.value]);

  useEffect(() => {
    const idProvincia = parseInt(form.provincia.value);

    if (!isNaN(idProvincia)) {
      setOptionComunas(filtrarComunas(idProvincia));
    }
  }, [form.provincia.value]);

  //   useEffect(() => {
  //     handleFetch({ url: "http://localhost/provincias", method: FetchMethods.GET }).then((response) => {
  //       if (response.message) {
  //         const provincias: { idProvincia: string; nombreProvincia: string; idRegion: number }[] = response.message as { idProvincia: string; nombreProvincia: string; idRegion: number }[];

  //         console.log(provincias);
  //       }
  //     });
  //   }, []);

  //   useEffect(() => {
  //     handleFetch({ url: "http://localhost/comunas", method: FetchMethods.GET }).then((response) => {
  //       if (response.message) {
  //         const comunas: { idComuna: number; nombreComuna: string; idProvincia: number }[] = response.message as { idComuna: number; nombreComuna: string; idProvincia: number }[];

  //         console.log(comunas);
  //       }
  //     });
  //   }, []);

  return (
    <div className="card flex flex-column " style={{ width: "100%", maxWidth: "800px" }}>
      <label htmlFor="correo">Correo: </label>
      <InputText
        id="correo"
        name="correo"
        value={form.correo.value}
        onChange={(e) => setValue(e.target.value, e.target.name, "email", e.target.required)}
        required={true}
        invalid={firstPressed.second && errors && errors.correo ? true : false || false}
        keyfilter="email"
      />

      <label htmlFor="telefono">Teléfono: </label>
      <InputText
        id="telefono"
        name="telefono"
        value={form.telefono.value}
        onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, e.target.required)}
        keyfilter="pnum"
        required={true}
        invalid={firstPressed.second && errors && errors.telefono ? true : false || false}
      />

      <label htmlFor="calle">Calle: </label>
      <InputText
        id="calle"
        name="calle"
        value={form.calle.value}
        onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, e.target.required)}
        required={true}
        invalid={firstPressed.second && errors && errors.calle ? true : false || false}
      />

      <label htmlFor="numero">Número: </label>
      <InputText
        id="numero"
        name="numero"
        value={form.numero.value}
        onChange={(e) => setValue(e.target.value, e.target.name, e.target.type, e.target.required)}
        required={true}
        invalid={firstPressed.second && errors && errors.numero ? true : false || false}
      />

      <label htmlFor="numero">Región: </label>
      <Dropdown
        value={form.region.value}
        name="region"
        id="region"
        onChange={(e) => handlerSelect(e.target.value, e.target.name, "number", true)}
        options={optionRegiones}
        optionLabel="region"
        optionValue="value"
        placeholder="Seleccione región"
        className="w-full md:w-14rem"
        invalid={firstPressed.second && errors && errors.region ? true : false || false}
      />

      <label htmlFor="numero">Provincia: </label>
      <Dropdown
        value={form.provincia.value}
        name="provincia"
        id="provincia"
        onChange={(e) => handlerSelect(e.target.value, e.target.name, "number", true)}
        options={optionPronvicias}
        optionLabel="provincia"
        optionValue="value"
        placeholder="Seleccione provincia"
        className="w-full md:w-14rem"
        disabled={!optionPronvicias || optionPronvicias.length === 0}
        invalid={firstPressed.second && optionPronvicias && optionPronvicias.length > 0 && errors && errors.provincia ? true : false || false}
      />

      <label htmlFor="comuna">Comuna: </label>
      <Dropdown
        value={form.comuna.value}
        name="comuna"
        id="comuna"
        onChange={(e) => handlerSelect(e.target.value, e.target.name, "number", true)}
        options={optionComunas}
        optionLabel="comuna"
        optionValue="value"
        placeholder="Seleccione comuna"
        className="w-full md:w-14rem"
        disabled={!optionComunas || optionComunas.length === 0}
        invalid={firstPressed.second && optionComunas && optionComunas.length > 0 && errors && errors.comuna ? true : false || false}
      />
    </div>
  );
};
