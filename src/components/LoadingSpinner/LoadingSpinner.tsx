import styles from "./LoadingSpinner.module.css";
import { ProgressSpinner } from "primereact/progressspinner";

export const LoadingSpinner = () => {
  return (
    <div className={`${styles["loading-container"]}`}>
      <ProgressSpinner />
    </div>
  );
};
