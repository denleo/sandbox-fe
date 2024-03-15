import "./assets/theme/theme.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/layout/AppLayout";
import WordsSearchPage from "./pages/wordbook/explore/WordsSearchPage";
import WordsLearnPage from "./pages/wordbook/learn/WordsLearnPage";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import { auth } from "./firebase";
import Test from "./components/Test";
import { RootState, store } from "./redux/store";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const state = store.getState() as RootState;
    const root = document.getElementById("root")!;
    root.classList.add(state.themeOptions.mode);
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <AppLayout />
            </Protected>
          }
        >
          <Route path="wordbook/explore" element={<WordsSearchPage />} />
          <Route path="wordbook/learn" element={<WordsLearnPage />} />
          <Route path="pricing" element={<Test />} />
          <Route path="about" element={<Test />} />
        </Route>

        <Route
          path="/login"
          element={
            <AlreadyLoggedIn>
              <Login />
            </AlreadyLoggedIn>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function Protected({ children }: { children: JSX.Element }) {
  if (!auth.currentUser) {
    return (
      <Navigate
        to="/login"
        state={{ from: window.location.pathname + window.location.search }}
        replace
      />
    );
  }

  return children;
}

function AlreadyLoggedIn({ children }: { children: JSX.Element }) {
  if (auth.currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default App;
