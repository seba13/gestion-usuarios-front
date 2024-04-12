import styles from "./Notification.module.css";

export interface TypeNotification {
  type: "error" | "success";
  message: string;
  id: number;
}

export const Notification = ({ propNotification, onClose }: { propNotification: TypeNotification; onClose: () => void }) => {
  return (
    <div className={`${styles.notification} ${propNotification.type === "success" ? styles["success"] : styles["error"]}`}>
      <span className={styles["close-notification"]} onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </span>
      <div className={`${styles["container-text"]}`}>
        {/* <i class="fa-regular fa-circle-check"></i> */}
        {/* <i class="fa-regular fa-circle-xmark"></i> */}
        <i className={`fa-regular ${propNotification.type === "success" ? "fa-circle-check" : "fa-circle-xmark"}`}></i>
        <div className={styles["text"]}>
          <h2>{propNotification.type === "success" ? "Confirmado" : "Error"}</h2>
          <p>{propNotification.message}</p>
        </div>
      </div>
    </div>
  );
};
