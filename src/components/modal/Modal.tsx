import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  title: string;
  maxWidth?: string;
  children?: ReactNode;
};

function Modal({ onClose, title, maxWidth = "450px", children }: ModalProps) {
  return createPortal(
    <div className={styles.background} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: maxWidth }}
      >
        <div className={styles.modal__header}>
          <h3 className={styles.modal__header__title}>{title}</h3>
          <i className="fa-regular fa-circle-xmark fa-lg" onClick={onClose}></i>
        </div>
        <section className={styles.modal__content}>{children}</section>
      </div>
    </div>,
    document.getElementById("root")!
  );
}

export default Modal;
