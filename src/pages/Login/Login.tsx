import { LazyMotion, domAnimation, m } from "framer-motion";
import Card from "../../components/ui/Card/Card";
import styles from "./Login.module.scss";
import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self");
  };
  const handleGithubLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/github`, "_self");
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
        <Card>
          <div className={styles.loginActions}>
            <h3>Login with</h3>
            <button className={styles.googleBtn} onClick={handleGoogleLogin}>
              <FaGoogle />
              Google
            </button>
            <button className={styles.githubBtn} onClick={handleGithubLogin}>
              <FiGithub />
              GitHub
            </button>
          </div>
        </Card>
      </m.div>
    </LazyMotion>
  );
};

export default Login;
