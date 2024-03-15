import styles from "./styles.module.scss";
import googleLogo from "../../assets/images/googleLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.ts";
import { useToast } from "../../components/toast/ToastProvider.tsx";
import { baseApiService } from "../../apis/baseApiService.ts";

export default function Login() {
  const [checkHealth] = baseApiService.useLazyCheckHealthQuery();
  const showToast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);

      const result = await checkHealth(null, false);
      if (!result.isSuccess) {
        showToast({
          message: "App services are not available",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      if (state) {
        navigate(state.from);
      } else {
        navigate("/");
      }

      showToast({
        message: `Successfully signed in`,
        type: "info",
        timeout: 3000,
      });
    } catch (error) {
      console.log(error);

      showToast({
        message: "Login failed",
        type: "error",
        timeout: 3000,
      });
    }
  }

  return (
    <div className={styles.loginSection}>
      <h1 className={styles.loginTitle}>Sign in via Google</h1>
      <button
        type="button"
        className={styles.googleLoginButton}
        onClick={handleLogin}
      >
        <img src={googleLogo} width="50" height="50" alt="Google logo" />
      </button>
    </div>
  );
}
