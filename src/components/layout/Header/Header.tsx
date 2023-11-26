import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { userActions, UserType } from "../../../store";
import { useDispatch } from "react-redux";

type HeaderProps = { user: UserType | null };

const Header = ({ user }: HeaderProps) => {
  const dispatch = useDispatch();

  return (
    <header>
      <div className={styles.headerInner}>
        <Link to="/">
          <div className={styles.logo}>
            <img src="Cleverpy-192x192.png" alt="Company logo" />
          </div>
        </Link>
        <nav>
          {user && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Posts
              </NavLink>
              <button onClick={() => dispatch(userActions.logout())}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
