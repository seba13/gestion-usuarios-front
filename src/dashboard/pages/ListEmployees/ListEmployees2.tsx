import { useNavigate } from "react-router-dom";

import { utils, writeFile } from "xlsx";

import { arrProvincias } from "../../../utils/getLocationData";

import { FormEvent, useEffect, useState } from "react";
import { Employee } from "../../../interfaces/Employees";
import { FetchMethods, useFetch } from "../../../hooks/useFetch";
import { Result } from "../../../interfaces/fetchData";
import { FilterMatchMode } from "primereact/api";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

import styles from "./ListEmployees.module.css";
import "./datatable.css";

import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
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
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filter>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    paterno: { value: null, matchMode: FilterMatchMode.CONTAINS },
    materno: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rut: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sexo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // estado: { value: "Vigente", matchMode: FilterMatchMode.EQUALS },
    estado: { value: null, matchMode: FilterMatchMode.EQUALS },
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

  const exportExcel = () => {
    if (employees && employees.length > 0) {
      const ws = utils.json_to_sheet(employees);

      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");

      const fechaActual = new Date();
      const formatFecha = `${fechaActual.getFullYear()}-${fechaActual.getDate() + 1}-${fechaActual.getMonth() + 1}_${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

      console.log(formatFecha);

      writeFile(wb, "empleados-" + formatFecha + ".xlsx");
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-center gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Búsqueda general" />
        </span>
        {/* <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} tooltip="PDF" tooltipOptions={{ position: "bottom", mouseTrack: true, mouseTrackTop: 15 }} /> */}

        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="Excel" tooltip="Excel" tooltipOptions={{ position: "bottom", mouseTrack: true, mouseTrackTop: 15 }} />
      </div>
    );
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusRowFilterTemplate = (options: FilterOptions) => {
    return (
      <Dropdown value={options.value} options={estados} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Seleccione estado" className="p-column-filter" showClear style={{ minWidth: "12rem" }} />
    );
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
    handleFetch({ url: `${import.meta.env.VITE_URL_API}empleados`, method: FetchMethods.GET }).then((data: Result) => {
      if (data.message) {
        const employeesArr: Employee[] = (data.message as Employee[]).map((employee) => {
          return {
            idEmpleado: employee.idEmpleado,
            rut: employee.rut,
            dv: employee.dv,
            nombre: employee.nombre,
            paterno: employee.paterno,
            materno: employee.materno,
            fecNac: employee.fecNac,
            profesion: employee.profesion,
            idCargo: employee.idCargo,
            cargo: employee.cargo,
            estadoCivil: employee.estadoCivil,
            telefono: employee.telefono,
            correo: employee.correo,
            sexo: employee.sexo === "m" ? "Masculino" : "Femenino",
            idRegion: employee.idRegion,
            region: employee.region,
            idProvincia: employee.idProvincia,
            provincia: arrProvincias.filter((provincia) => provincia.idProvincia === parseInt(employee.idProvincia))[0].nombreProvincia,
            idComuna: employee.idComuna,
            comuna: employee.comuna,
            calle: employee.calle,
            numero: employee.numero,
            fecIngreso: employee.fecIngreso,
            fecDespido: employee.fecDespido,
            idEstado: employee.idEstado,
            estado: employee.estado,
          } as Employee;
        });
        setEmployees(employeesArr);

        setLoading(false);
      }
    });
  }, []);

  const handleNavigate = (rut: string) => {
    rut = rut.split("-")[0];

    navigate("/empleado/" + rut);
  };

  const actionBodyTemplate = (rowData: Employee) => {
    return <Button type="button" icon="pi pi-user-edit" rounded onClick={() => handleNavigate(rowData.rut)}></Button>;
  };

  const header = renderHeader();

  return (
    <div className={`${styles.container} animate__animated animate__fadeInLeft `} style={{ zIndex: -1 }}>
      {loading && <LoadingSpinner />}
      <DataTable
        scrollHeight="400px"
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
        className={`${styles.table} mt-4`}
        emptyMessage="No se encontraron empleados">
        <Column header="Rut" field="rut" filterField="rut" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por Apellido Paterno" />

        <Column field="nombre" header="Nombre" filter filterPlaceholder="Buscar por nombre" style={{ minWidth: "12rem" }} />
        <Column header="Apellido Paterno" field="paterno" filterField="paterno" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por Apellido Paterno" />

        <Column header="Apellido Materno" field="materno" filterField="materno" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por Apellido Paterno" />

        <Column header="Sexo" field="sexo" filterField="sexo" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por Apellido Paterno" />

        <Column field="estado" header="Estado" showFilterMenu={false} filterMenuStyle={{ width: "14rem" }} style={{ minWidth: "12rem" }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />

        <Column header="Acción" headerStyle={{ width: "5rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", overflow: "visible" }} body={actionBodyTemplate} frozen alignFrozen="right" />
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
