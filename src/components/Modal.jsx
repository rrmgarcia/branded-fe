import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "../styles/Modal.module.css";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div>
      <div className={styles.overlay}></div>
      <div className={styles.modalContainer}>
        <div className={styles["modal-closeIcon"]} onClick={onClose}>
          <AiOutlineCloseCircle />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
