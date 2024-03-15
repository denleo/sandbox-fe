/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import Toast, { ToastInfo } from "./Toast";
import styles from "./styles.module.scss";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";

const ToastContext = createContext<((toast: ToastInfo) => void) | undefined>(
  undefined
);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((state) => state.filter((x) => x.id !== id));
  }, []);

  const addToast = useCallback((toast: ToastInfo) => {
    toast.id = uuid();
    setToasts((state) => [...state, toast]);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      {toasts.length !== 0 &&
        createPortal(
          <section className={styles.toastList}>
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                toastInfo={toast}
                removeCallback={removeToast}
              />
            ))}
          </section>,
          document.getElementById("root")!
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (value === undefined) {
    throw new Error("useToast must be inside a ToastProvider");
  }

  return value;
}

export default ToastProvider;
