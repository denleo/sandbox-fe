import styles from "./styles.module.scss";

export type ButtonProps = {
  onClick: () => void;
  children?: string | JSX.Element | JSX.Element[];
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className={styles.appButton}
      role="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
