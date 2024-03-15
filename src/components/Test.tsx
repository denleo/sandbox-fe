import { auth } from "../firebase";
import ThemeSwitcher from "./themeSwitcher/ThemeSwitcher";
import { useToast } from "./toast/ToastProvider";

function Test() {
  const user = auth.currentUser!;
  const addToast = useToast();

  console.log("TEST COMPONENT RENDER");

  function handleClick() {
    addToast({
      message: `${new Date().getTime()}`,
      type: "success",
      timeout: 3000,
    });
    addToast({
      message: `${new Date().getTime()}`,
      type: "error",
      timeout: 3000,
    });
    addToast({
      message: `${new Date().getTime()}`,
      type: "info",
      timeout: 3000,
    });
  }

  return (
    <>
      <div>{user.displayName}</div>
      <div>{user.email}</div>
      <div>{user.uid}</div>
      <button onClick={handleClick}>Press</button>
      <ThemeSwitcher />
    </>
  );
}

export default Test;
