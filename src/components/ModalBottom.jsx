import React from "react";
// import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "../styles/ModalBottom.module.css";
// import { Modal } from "bootstrap";

function ModalBottom({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div>
      <div className={styles.overlay}></div>
      <div className={styles.modalContainer}>
        <div className={styles.close} onClick={onClose}>
          {/* <AiOutlineCloseCircle /> */}
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalBottom;
