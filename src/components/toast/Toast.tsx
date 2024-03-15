import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ProgressBar from "../progressBar/ProgressBar";

export type ToastInfo = {
  id?: string;
  message: string;
  type: "success" | "error" | "info";
  timeout: number;
};

function Toast({
  toastInfo,
  removeCallback,
}: {
  toastInfo: ToastInfo;
  removeCallback: (id: string) => void;
}) {
  const [liveTime, setLiveTime] = useState(toastInfo.timeout);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkLiveTime = useCallback(
    (liveTime: number) => {
      if (liveTime > 0) {
        setLiveTime((liveTime) => liveTime - 10);
      } else {
        removeCallback(toastInfo.id!);
      }
    },
    [removeCallback, toastInfo.id]
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => checkLiveTime(liveTime), 10);

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [checkLiveTime, liveTime]);

  return (
    <div
      onMouseEnter={() => {
        intervalRef.current && clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => {
        intervalRef.current = setInterval(() => checkLiveTime(liveTime), 10);
      }}
      className={styles.toast}
      style={{
        backgroundColor:
          toastInfo.type === "success"
            ? "#36914d"
            : toastInfo.type === "error"
            ? "#cf2c00"
            : "#7986cb",
      }}
    >
      <div className={styles.toast__content}>
        <div className={styles.toast__content__text}>{toastInfo.message}</div>
        <div className={styles.toast__content__close}>
          <i
            className="fa-solid fa-xmark fa-lg"
            onClick={() => removeCallback(toastInfo.id!)}
          ></i>
        </div>
      </div>
      <div className={styles.toast__livetime}>
        <ProgressBar completed={(liveTime * 100) / toastInfo.timeout} />
      </div>
    </div>
  );
}

export default Toast;
