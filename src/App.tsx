import classes from "./styles/App.module.scss";
import Router from "./router";
import { useEffect } from "react";
import { userActions } from "./store";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login/success`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(userActions.login(data.user));
      } else {
        throw new Error("Error logging in..");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className={classes.App}>
      <Router />
    </div>
  );
}

export default App;
