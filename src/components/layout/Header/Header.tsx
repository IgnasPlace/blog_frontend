import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { userActions, UserType } from "../../../store";
import { useDispatch } from "react-redux";

type HeaderProps = { user: UserType | null };

const Header = ({ user }: HeaderProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/logout`, "_self");
    dispatch(userActions.logout());
  };

  return (
    <header>
      <div className={styles.headerInner}>
        <Link to="/">
          <div className={styles.logo}>
            {/* <img src="Cleverpy-192x192.png" alt="Company logo" /> */}
            logo.
          </div>
        </Link>
        <nav>
          {user && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                All Posts
              </NavLink>
              <NavLink
                to="/my-posts"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                My Posts
              </NavLink>
              <NavLink
                to="/create-post"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Create Post
              </NavLink>

              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
