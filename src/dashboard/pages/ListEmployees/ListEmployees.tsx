import { FormEvent, useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import styles from "./ListEmployees.module.css";

type Clientes = {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
  };
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: {
    name: string;
    image: string;
  };
  balance: number;
};

type Representative = {
  name: string;
  image: string;
};

type FilterOptions = {
  value: boolean | null | undefined;
  filterApplyCallback: (value: boolean | null | undefined) => void;
};

type Filter = {
  global: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  name: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  "country.name": {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  representative: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  status: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
  verified: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
};

export const ListEmployees = () => {
  const [customers, setCustomers] = useState<Clientes[]>();
  const [filters, setFilters] = useState<Filter>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [representatives] = useState<Representative[]>([
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ]);
  const [statuses] = useState(["unqualified", "qualified", "new", "negotiation", "renewal"]);

  const getSeverity = (status: string) => {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
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

  const countryBodyTemplate = (rowData: Clientes) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: "24px" }} />
        <span>{rowData.country.name}</span>
      </div>
    );
  };

  const representativeBodyTemplate = (rowData: Clientes) => {
    const representative = rowData.representative;

    return (
      <div className="flex align-items-center gap-2">
        <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
        <span>{representative.name}</span>
      </div>
    );
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusRowFilterTemplate = (options: FilterOptions) => {
    return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: "12rem" }} />;
  };

  const statusBodyTemplate = (rowData: Clientes) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  };

  const representativesItemTemplate = (option: Representative) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
        <span>{option.name}</span>
      </div>
    );
  };

  const verifiedRowFilterTemplate = (options: FilterOptions) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
  };

  const representativeRowFilterTemplate = (options: FilterOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={representatives}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={1}
        style={{ minWidth: "14rem" }}
      />
    );
  };

  const verifiedBodyTemplate = (rowData: Clientes) => {
    return <i className={classNames("pi", { "true-icon pi-check-circle": rowData.verified, "false-icon pi-times-circle": !rowData.verified })}></i>;
  };

  useEffect(() => {
    const clientes: Clientes[] = [
      {
        id: 1000,
        name: "James Butt",
        country: {
          name: "Algeria",
          code: "dz",
        },
        company: "Benton, John B Jr",
        date: "2015-09-13",
        status: "unqualified",
        verified: true,
        activity: 17,
        representative: {
          name: "Ioni Bowcher",
          image: "ionibowcher.png",
        },
        balance: 70663,
      },
      {
        id: 1001,
        name: "Josephine Darakjy",
        country: {
          name: "Egypt",
          code: "eg",
        },
        company: "Chanay, Jeffrey A Esq",
        date: "2019-02-09",
        status: "proposal",
        verified: true,
        activity: 0,
        representative: {
          name: "Amy Elsner",
          image: "amyelsner.png",
        },
        balance: 82429,
      },
      {
        id: 1002,
        name: "Art Venere",
        country: {
          name: "Panama",
          code: "pa",
        },
        company: "Chemel, James L Cpa",
        date: "2017-05-13",
        status: "qualified",
        verified: false,
        activity: 63,
        representative: {
          name: "Asiya Javayant",
          image: "asiyajavayant.png",
        },
        balance: 28334,
      },
      {
        id: 1003,
        name: "Lenna Paprocki",
        country: {
          name: "Slovenia",
          code: "si",
        },
        company: "Feltz Printing Service",
        date: "2020-09-15",
        status: "new",
        verified: false,
        activity: 37,
        representative: {
          name: "Xuxue Feng",
          image: "xuxuefeng.png",
        },
        balance: 88521,
      },
      {
        id: 1004,
        name: "Donette Foller",
        country: {
          name: "South Africa",
          code: "za",
        },
        company: "Printing Dimensions",
        date: "2016-05-20",
        status: "proposal",
        verified: true,
        activity: 33,
        representative: {
          name: "Asiya Javayant",
          image: "asiyajavayant.png",
        },
        balance: 93905,
      },
      {
        id: 1007,
        name: "Leota Dilliard",
        country: {
          name: "Serbia",
          code: "rs",
        },
        company: "Commercial Press",
        date: "2019-08-13",
        status: "renewal",
        verified: true,
        activity: 69,
        representative: {
          name: "Onyama Limba",
          image: "onyamalimba.png",
        },
        balance: 26640,
      },
      {
        id: 1008,
        name: "Sage Wieser",
        country: {
          name: "Egypt",
          code: "eg",
        },
        company: "Truhlar And Truhlar Attys",
        date: "2018-11-21",
        status: "unqualified",
        verified: true,
        activity: 76,
        representative: {
          name: "Ivan Magalhaes",
          image: "ivanmagalhaes.png",
        },
        balance: 65369,
      },
      {
        id: 1009,
        name: "Kris Marrier",
        country: {
          name: "Mexico",
          code: "mx",
        },
        company: "King, Christopher A Esq",
        date: "2015-07-07",
        status: "proposal",
        verified: false,
        activity: 3,
        representative: {
          name: "Onyama Limba",
          image: "onyamalimba.png",
        },
        balance: 63451,
      },
      {
        id: 1010,
        name: "Minna Amigon",
        country: {
          name: "Romania",
          code: "ro",
        },
        company: "Dorl, James J Esq",
        date: "2018-11-07",
        status: "qualified",
        verified: false,
        activity: 38,
        representative: {
          name: "Anna Fali",
          image: "annafali.png",
        },
        balance: 71169,
      },
      {
        id: 1011,
        name: "Abel Maclead",
        country: {
          name: "Singapore",
          code: "sg",
        },
        company: "Rangoni Of Florence",
        date: "2017-03-11",
        status: "qualified",
        verified: true,
        activity: 87,
        representative: {
          name: "Bernardo Dominic",
          image: "bernardodominic.png",
        },
        balance: 96842,
      },
      {
        id: 1012,
        name: "Kiley Caldarera",
        country: {
          name: "Serbia",
          code: "rs",
        },
        company: "Feiner Bros",
        date: "2015-10-20",
        status: "unqualified",
        verified: false,
        activity: 80,
        representative: {
          name: "Onyama Limba",
          image: "onyamalimba.png",
        },
        balance: 92734,
      },
      {
        id: 1013,
        name: "Graciela Ruta",
        country: {
          name: "Chile",
          code: "cl",
        },
        company: "Buckley Miller & Wright",
        date: "2016-07-25",
        status: "negotiation",
        verified: false,
        activity: 59,
        representative: {
          name: "Amy Elsner",
          image: "amyelsner.png",
        },
        balance: 45250,
      },
      {
        id: 1014,
        name: "Cammy Albares",
        country: {
          name: "Philippines",
          code: "ph",
        },
        company: "Rousseaux, Michael Esq",
        date: "2019-06-25",
        status: "new",
        verified: true,
        activity: 90,
        representative: {
          name: "Asiya Javayant",
          image: "asiyajavayant.png",
        },
        balance: 30236,
      },
      {
        id: 1015,
        name: "Mattie Poquette",
        country: {
          name: "Venezuela",
          code: "ve",
        },
        company: "Century Communications",
        date: "2017-12-12",
        status: "negotiation",
        verified: false,
        activity: 52,
        representative: {
          name: "Anna Fali",
          image: "annafali.png",
        },
        balance: 64533,
      },
      {
        id: 1016,
        name: "Meaghan Garufi",
        country: {
          name: "Malaysia",
          code: "my",
        },
        company: "Bolton, Wilbur Esq",
        date: "2018-07-04",
        status: "unqualified",
        verified: false,
        activity: 31,
        representative: {
          name: "Ivan Magalhaes",
          image: "ivanmagalhaes.png",
        },
        balance: 37279,
      },
    ];

    setCustomers(clientes);
    setLoading(false);
  }, []);

  const header = renderHeader();

  return (
    <div className={`${styles.container} animate__animated animate__fadeInLeft `} style={{ zIndex: -1 }}>
      {/* <h1>ListEmployees</h1> */}

      <DataTable
        value={customers}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["name", "country.name", "representative.name", "status"]}
        header={header}
        emptyMessage="No customers found.">
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: "12rem" }} />
        <Column header="Country" filterField="country.name" style={{ minWidth: "12rem" }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
        <Column header="Agent" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: "14rem" }} style={{ minWidth: "14rem" }} body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
        <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: "14rem" }} style={{ minWidth: "12rem" }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
        <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: "6rem" }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
      </DataTable>
    </div>
  );
};
