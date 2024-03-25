import Button from "../button/Button";
import Modal from "../modal/Modal";
import styles from "./styles.module.scss";

export type DialogModalProps = {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function DialogModal({
  title = "Confirmation",
  message,
  onConfirm,
  onCancel,
}: DialogModalProps) {
  return (
    <Modal onClose={onCancel} title={title} maxWidth="312px">
      <div className={styles.container}>
        <div className={styles.container__message}>
          <h4>{message}</h4>
        </div>
        <div className={styles.container__actions}>
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}

export default DialogModal;
