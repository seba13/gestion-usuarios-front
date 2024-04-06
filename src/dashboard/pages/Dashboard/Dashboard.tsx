// import "primeicons/primeicons.css";
// import { PanelMenu } from "primereact/panelmenu";
// import "primereact/resources/themes/saga-blue/theme.css";

import { Outlet } from "react-router-dom";
import { NavbarDashboard } from "../../components/Nabvar/Navbar";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <div className={`${styles.dashboard} animate__animated animate__fadeIn`}>
      {/* <h1>dashboard</h1> */}

      <NavbarDashboard></NavbarDashboard>

      <Outlet></Outlet>
    </div>
  );
};
