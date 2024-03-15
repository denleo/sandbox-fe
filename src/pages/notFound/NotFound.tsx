import styles from "./styles.module.scss";
import notFoundImg from "../../assets/images/notFound.png";

export default function NotFound() {
  return (
    <div className={styles.notFoundSection}>
      <img src={notFoundImg} className={styles.notFoundImage}></img>
      <h1 className={styles.notFoundTitle}>Page was not found...</h1>
    </div>
  );
}
