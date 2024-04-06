import styles from "./ListEmployees.module.css";

export const ListEmployees = () => {
  return (
    <div className={`${styles.container} animate__animated animate__fadeInLeft `} style={{ zIndex: -1 }}>
      <h1>ListEmployees</h1>
    </div>
  );
};
