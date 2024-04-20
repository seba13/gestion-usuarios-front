import { FormEvent, useEffect, useState } from "react";
import { Employee } from "../../../interfaces/Employees";
import { FetchMethods, useFetch } from "../../../hooks/useFetch";
import { Result } from "../../../interfaces/fetchData";
import { FilterMatchMode } from "primereact/api";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import styles from "./ListEmployees.module.css";
// import { classNames } from "primereact/utils";

// activo: 0;
// contrasena: "1234";
// fec_creacion: "2024-03-27T19:23:12.000Z";
// id_usuario: "739d8e8e-ec6f-11ee-b4e1-04d4c4544bc0";
// rol: "c57763da-eb91-11ee-aa6b-7c4d8fb9ed51";
// ultimo_acceso: null;
// usuario: "fabian.niclous";

interface FilterOptions {
  value: boolean | null | undefined;
  filterApplyCallback: (value: boolean | null | undefined) => void;
}

type Filter = {
  global: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  nombre: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  paterno: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  materno: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  rut: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  sexo: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  estado: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
};

export const ListEmployees2 = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const { handleFetch } = useFetch({ url: "http://localhost/empleados", method: FetchMethods.GET });

  const [filters, setFilters] = useState<Filter>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    paterno: { value: null, matchMode: FilterMatchMode.CONTAINS },
    materno: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rut: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sexo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { value: "Vigente", matchMode: FilterMatchMode.EQUALS },
  });

  const [estados] = useState(["Vigente", "Vacaciones", "Licencia", "Despedido", "Inhabilitado"]);

  const getSeverity = (status: string) => {
    switch (status) {
      case "Despedido":
        return "danger";

      case "Vigente":
        return "success";

      case "Vacaciones":
        return "info";

      case "negotiation":
        return "warning";

      case "Inhabilitado":
        return null;
    }
  };

  const onGlobalFilterChange = (e: FormEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const updatedFilters = { ...filters };

    updatedFilters.global.value = value;

    setFilters(updatedFilters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusRowFilterTemplate = (options: FilterOptions) => {
    return <Dropdown value={options.value} options={estados} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: "12rem" }} />;
  };

  const statusBodyTemplate = (rowData: Employee) => {
    return <Tag value={rowData.estado} severity={getSeverity(rowData.estado)} />;
  };

  // const verifiedRowFilterTemplate = (options: FilterOptions) => {
  //   return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
  // };

  // const verifiedBodyTemplate = (rowData: Employee) => {
  //   return <i className={classNames("pi", { "true-icon pi-check-circle": rowData.verified, "false-icon pi-times-circle": !rowData.verified })}></i>;
  // };

  useEffect(() => {
    handleFetch().then((data: Result) => {
      if (data.message) {
        const employeesArr: Employee[] = data.message as Employee[];
        setEmployees(employeesArr);

        // console.log(employees);
        console.log(employees && employees[0].nombre);

        setLoading(false);
      }
    });
  }, []);

  const header = renderHeader();

  return (
    <div className={`${styles.container} animate__animated animate__fadeInLeft `} style={{ zIndex: -1 }}>
      <DataTable
        value={employees}
        paginator
        rows={10}
        dataKey="idEmpleado"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["nombre", "paterno", "materno", "rut", "sexo", "estado"]}
        header={header}
        scrollable
        scrollHeight="400px" className="mt-4"
        emptyMessage="No se encontraron empleados">
        <Column header="Rut" field="rut" filterField="rut" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por Apellido Paterno"  />

        <Column field="nombre" header="Nombre" filter filterPlaceholder="Buscar por nombre" style={{ minWidth: "12rem" }} />
        <Column header="Apellido Paterno" field="paterno" filterField="paterno" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por Apellido Paterno" />

        <Column header="Apellido Materno" field="materno" filterField="materno" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por Apellido Paterno" />

        <Column header="Sexo" field="sexo" filterField="sexo" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por Apellido Paterno" />

        <Column field="estado" header="Estado" showFilterMenu={false} filterMenuStyle={{ width: "14rem" }} style={{ minWidth: "12rem" }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} frozen alignFrozen="right" />
      </DataTable>
    </div>
  );
};

// global: {
//   value: string | null;
//   matchMode: FilterMatchMode;
// };
// nombre: {
//   value: string | null;
//   matchMode: FilterMatchMode;
// };
// paterno: {
//   value: string | null;
//   matchMode: FilterMatchMode;
// };
// materno: {
//   value: string | null;
//   matchMode: FilterMatchMode;
// };
// rut: {
//   value: string | null;
//   matchMode: FilterMatchMode;
// };
// sexo: {
//   value: string | null;
//   matchMode: FilterMatchMode;
// };
// estado: {
//   value: string | null;
//   matchMode: FilterMatchMode;
// };
