import jsPDF from "jspdf";
import { htmlToText } from "html-to-text";
import { FormEvent, useEffect, useState } from "react";

import { FetchMethods, useFetch } from "../../../../hooks/useFetch";

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

import styles from "../../ListEmployees/ListEmployees.module.css";
// import "../../ListEmployees/datatable.css";
import "./ListEmployee.css";

import { LoadingSpinner } from "../../../../components/LoadingSpinner/LoadingSpinner";

import { Letter } from "../../../../interfaces/Letter";

interface FilterOptions {
  value: boolean | null | undefined;
  filterApplyCallback: (value: boolean | null | undefined) => void;
}

type Filter = {
  global: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  idCarta: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  rutEmisor: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  fechaEmision: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  tipoCarta: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
};

export const ListEmployeeLetter = ({ rut }: { rut: string }) => {
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const { handleFetch } = useFetch();
  const [letters, setLetters] = useState<Letter[]>();

  const [filters, setFilters] = useState<Filter>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    idCarta: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rutEmisor: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fechaEmision: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tipoCarta: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [estados] = useState(["Felicitaciones", "Recomendacion", "Vacaciones", "Despido", "Contrato", "Amonestacion"]);

  const getSeverity = (status: string) => {
    switch (status) {
      case "Despido":
        return "danger";

      case "Amonestacion":
        return "danger";

      case "Felicitaciones":
        return "success";

      case "Recomendacion":
        return "info";

      case "Vacaciones":
        return "warning";

      case "Contrato":
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

  //   const exportPdf = () => {
  //     const doc = new jsPDF("portrait", "pt", "A4");
  //     doc.setFontSize(20);
  //     doc.text("Reporte trabajadores", 40, 40);
  //     autoTable(doc, { head: headersPDF, body: getCols, startY: 50 });

  //     // doc.save("empleados.pdf");

  //     const blob = new Blob([doc.output()], { type: "application/pdf" });

  //     // Crear una URL para el blob
  //     const url = URL.createObjectURL(blob);

  //     // Mostrar la URL en el navegador
  //     window.open(url, "_blank");
  //   };

  useEffect(() => {
    if (rut) {
      handleFetch({ url: `${import.meta.env.VITE_URL_API}cartas/${rut}`, method: FetchMethods.GET })
        .then((response) => {
          setLoading(false);
          if (response.message) {
            console.log(response.message);

            setLetters(
              (response.message as Letter[]).map((letter) => {
                const fechaEmision = new Date(letter.fecEntrega);

                const year = fechaEmision.getFullYear();
                const month = fechaEmision.getMonth() + 1 < 10 ? "0" + (fechaEmision.getMonth() + 1) : fechaEmision.getMonth() + 1;
                const day = fechaEmision.getDate() < 10 ? "0" + fechaEmision.getDate() : fechaEmision.getDate();
                const hours = fechaEmision.getHours() < 10 ? "0" + fechaEmision.getHours() : fechaEmision.getHours();
                const minutes = fechaEmision.getMinutes() < 10 ? "0" + fechaEmision.getMinutes() : fechaEmision.getMinutes();
                const seconds = fechaEmision.getSeconds() < 10 ? "0" + fechaEmision.getSeconds() : fechaEmision.getSeconds();

                const formatFecha = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

                return {
                  ...letter,
                  fecEntrega: formatFecha,
                };
              })
            );
          }
        })
        .catch(() => {
          setLoading(false);
          setLetters([]);
        });
    }
  }, [rut]);

  const renderHeader = () => {
    return (
      <div className="flex justify-content-center gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Búsqueda general" />
        </span>
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

  const statusBodyTemplate = (rowData: Letter) => {
    return <Tag value={rowData.tipoCarta} severity={getSeverity(rowData.tipoCarta)} />;
  };

  const exportPdf = (idCarta: string, tipoCarta: string) => {
    if (letters && letters.length > 0) {
      const val = letters.filter((letter) => letter.idCarta === idCarta)[0].motivo;

      const text = htmlToText(val, {
        wordwrap: 130,
      });

      // Create a new instance of jsPDF
      const jspdf = new jsPDF("p", "pt", "letter");

      // Define margin using an object
      const margin = { top: 30, right: 30, bottom: 30, left: 30 };

      // Add text to the PDF with specified margin
      jspdf.text(text, margin.left, margin.top, { align: "left", maxWidth: 500 });

      // Save the PDF with a filename
      jspdf.save(tipoCarta + "-" + new Date() + ".pdf");
    }
  };

  const actionBodyTemplate = (rowData: Letter) => {
    return <Button type="button" icon="pi pi-file-pdf" rounded severity="warning" tooltip="PDF" tooltipOptions={{ position: "bottom", mouseTrack: true, mouseTrackTop: 15 }} onClick={() => exportPdf(rowData.idCarta, rowData.tipoCarta)}></Button>;
  };

  const header = renderHeader();

  return (
    <div className={`${styles.container} `} style={{ zIndex: -1 }}>
      {loading && <LoadingSpinner />}
      <DataTable
        scrollHeight="400px"
        value={letters}
        paginator
        rows={10}
        dataKey="idEmpleado"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["idCarta", "rutEmisor", "fechaEmision", "tipoCarta"]}
        header={header}
        scrollable
        className={`${styles.table} ${styles["table-letter"]} mt-4`}
        emptyMessage="No se encontraron cartas">
        <Column header="Id Carta" field="idCarta" filterField="idCarta" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por id" />

        <Column header="Rut Emisor" field="rutEmisor" filter filterPlaceholder="Buscar por id Emisor Carta" style={{ minWidth: "12rem" }} />

        <Column header="Fecha Emisión" field="fecEntrega" filterField="fechaEmision" style={{ minWidth: "12rem" }} filter filterPlaceholder="Buscar por fecha" />

        <Column header="Tipo Carta" field="tipoCarta" showFilterMenu={false} filterMenuStyle={{ width: "14rem" }} style={{ minWidth: "12rem" }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />

        <Column header="Acción" headerStyle={{ width: "5rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", overflow: "visible" }} body={actionBodyTemplate} frozen alignFrozen="right" />
      </DataTable>
    </div>
  );
};
