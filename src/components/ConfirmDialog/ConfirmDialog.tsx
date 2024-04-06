import styles from "./ConfirmDialog.module.css";
import { InputForm } from "../InputForm/InputForm";

import { useForm } from "../../hooks/useForm";
import { FormData } from "../../interfaces/formData";
import { Dialog } from "../../interfaces/Dialog";

export const ConfirmDialog = ({ dialog, onClose, onConfirm }: { dialog: Dialog; onClose: () => void; onConfirm: (confirmValue: boolean) => void }) => {
  const { acceptBtn, rejectBtn, message, show } = dialog;

  const initialData: FormData = {
    "accept-btn": {
      type: "submit",
      value: acceptBtn,
    },
    "reject-btn": {
      type: "submit",
      value: rejectBtn,
    },
  };

  const { form } = useForm({ initialData });

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(true);
    onClose();
  };

  const handleReject = () => {
    onConfirm(false);
    onClose();
  };

  return (
    <div className={`${styles.wrapper} ${show ? styles.show : ""}`}>
      <div className={`${styles.dialog}`}>
        <div className={`${styles["container-title"]}`}>
          <h2 className={`${styles["title"]}`}>CONFIRMACIÓN</h2>
          <span onClick={handleClose}>
            <i className={`${styles.cross} fa-solid fa-xmark`}></i>
          </span>
        </div>

        <div className={`${styles["container-message"]}`}>
          <span className="title">{message}</span>
        </div>

        <div className={`${styles["container-btn"]}`}>
          {acceptBtn && <InputForm type="submit" name="accept-btn" form={form} onClick={handleConfirm} />}
          {rejectBtn && <InputForm type="submit" name="reject-btn" form={form} addClasses={["form-input__danger"]} onClick={handleReject} />}
        </div>
      </div>
    </div>
  );
};
