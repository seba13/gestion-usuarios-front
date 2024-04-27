import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Nabbar.module.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ConfirmDialog } from "../../../components/ConfirmDialog/ConfirmDialog";
import { Dialog } from "../../../interfaces/Dialog";

const initialDialog: Dialog = {
  acceptBtn: "Sí",
  rejectBtn: "No",
  message: "¿Desea cerrar Sesión?",
  show: false,
  confirm: false,
};

export const NavbarDashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<Dialog>(initialDialog);

  const { logout } = useContext(AuthContext)!;

  const handleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    // navigate("/");
    // logout();

    setDialog((prevDialog = initialDialog) => {
      return { ...prevDialog, show: true };
    });
  };

  const handleClose = () => {
    setDialog((prevDialog = initialDialog) => {
      return { ...prevDialog, show: false };
    });
  };

  const handleConfirm = (confirmValue: boolean) => {
    setDialog((prevDialog = initialDialog) => {
      return { ...prevDialog, confirm: confirmValue };
    });
  };

  useEffect(() => {
    if (dialog.confirm) {
      navigate("/");
      logout();
    }
  }, [dialog, logout, navigate]);

  return (
    <nav className={`${styles.nav} ${open ? styles.open : ""}`}>
      <ConfirmDialog dialog={dialog} onClose={handleClose} onConfirm={handleConfirm} />
      <div className={`${styles["btn-toggle"]}`} tabIndex={0} onClick={handleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <NavLink to={"/"} className={({ isActive }) => (isActive ? `${styles.activo} ${styles["nav-item"]}` : `${styles["nav-item"]}`)}>
          <div className={`${styles["container-link"]}`}>
            <span className={`${styles.icon}`}>
              <i className="fa-solid fa-house"></i>
            </span>
            <span className={`${styles.text}`}>Inicio</span>
          </div>
        </NavLink>

        <NavLink to={"/nuevo-colaborador"} className={({ isActive }) => (isActive ? `${styles.activo} ${styles["nav-item"]}` : `${styles["nav-item"]}`)}>
          <div className={`${styles["container-link"]}`}>
            <span className={`${styles.icon}`}>
              <i className="fa-solid fa-user-plus"></i>
            </span>
            <span className={`${styles.text}`}>Agregar Colaborador</span>
          </div>
        </NavLink>

        <NavLink to={"/cambiar-contraseña"} className={({ isActive }) => (isActive ? `${styles.activo} ${styles["nav-item"]}` : `${styles["nav-item"]}`)}>
          <div className={`${styles["container-link"]}`}>
            <span className={`${styles.icon}`}>
              <i className="fa-solid fa-key"></i>
            </span>
            <span className={`${styles.text}`}>Cambiar Contraseña</span>
          </div>
        </NavLink>

        <p className={`${styles["nav-item"]}`} onClick={handleLogout}>
          <span className={`${styles["container-link"]}`}>
            <span className={`${styles.icon}`}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            <span className={`${styles.text}`}>Salir</span>
          </span>
        </p>
      </ul>
    </nav>
  );
};
