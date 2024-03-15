import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks";
import { setAppTheme } from "../../redux/themeOption/themeOptionSlice";
import { Theme } from "../../redux/themeOption/types";
import styles from "./styles.module.scss";

function ThemeSwitcher() {
  const themeOptions = useTypedSelector((store) => store.themeOptions);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const root = document.getElementById("root")!;
    root.classList.remove(...root.classList);
    root.classList.add(themeOptions.mode);
  }, [themeOptions]);

  const icon =
    themeOptions.mode === Theme.Dark ? (
      <i className="fa-solid fa-moon fa-xl"></i>
    ) : (
      <i className="fa-solid fa-sun fa-xl"></i>
    );

  return (
    <button
      className={styles.themeToggler}
      onClick={() =>
        dispatch(
          setAppTheme(
            themeOptions.mode === Theme.Dark ? Theme.Light : Theme.Dark
          )
        )
      }
    >
      {icon}
    </button>
  );
}

export default ThemeSwitcher;
