import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import styles from "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loginHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    /**
     * Sanitize the input (possibly using ZOD)
     * Send HTTP request to the backend to login
     * If successful save current user details in store
     */

    dispatch(
      userActions.login({
        id: 1,
        name: "Ignas",
        lastName: "Jareckas",
        position: "Front-end developer",
      })
    );
    navigate("/", {
      replace: true,
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={styles.loginContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <div className={styles.info}>
          <span>Login as USER_1 using any Email and Password</span>
        </div>
        <Card>
          <div className={styles.formContainer}>
            <h3>Login</h3>
            <form onSubmit={loginHandler}>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="email"
                  className={email.length > 0 ? styles.show : styles.hidden}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="password"
                  className={password.length > 0 ? styles.show : styles.hidden}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={6}
                />
              </div>
              <Button title="Login" class='loginButton' />
            </form>
          </div>
        </Card>
      </m.div>
    </LazyMotion>
  );
};

export default Login;
