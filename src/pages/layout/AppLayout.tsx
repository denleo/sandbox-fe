import "./AppLayout.scss";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.ts";
import { useEffect, useState } from "react";
import ThemeSwitcher from "../../components/themeSwitcher/ThemeSwitcher.tsx";

function AppLayout() {
  const navigate = useNavigate();
  const [showWordbookDropdown, setShowWordbookDropdown] = useState(false);

  useEffect(() => {
    const rootNode = document.getElementById("root");
    if (showWordbookDropdown) {
      rootNode!.onclick = () => setShowWordbookDropdown(false);
    } else {
      rootNode!.onclick = null;
    }
  }, [showWordbookDropdown]);

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <i className="fa-solid fa-fire fa-xl"></i>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  setShowWordbookDropdown(true);
                }}
                to={"/wordbook"}
              >
                Wordbook
              </NavLink>
              {showWordbookDropdown && (
                <div className="dropdown-menu">
                  <NavLink
                    to={"/wordbook/explore"}
                    onClick={() => setShowWordbookDropdown(false)}
                  >
                    Explore
                  </NavLink>
                  <NavLink
                    to={"/wordbook/learn"}
                    onClick={() => setShowWordbookDropdown(false)}
                  >
                    Learn
                  </NavLink>
                </div>
              )}
            </li>
            <li>
              <NavLink to={"/pricing"}>Pricing</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
          </ul>
        </nav>
        <div className="side-section">
          <img
            className="user-logo"
            src={auth.currentUser?.photoURL ?? undefined}
            alt="User avatar"
            referrerPolicy="no-referrer"
          />
          <div className="user-info">
            <p>{auth.currentUser?.displayName}</p>
            <a href={`mailto:${auth.currentUser?.email}`}>
              {auth.currentUser?.email}
            </a>
          </div>
          <div className="theme-toggle">
            <ThemeSwitcher />
          </div>
          <i
            className="fa-solid fa-arrow-right-from-bracket fa-lg"
            onClick={handleLogout}
          ></i>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
