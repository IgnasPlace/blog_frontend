import { Link } from "react-router-dom";

const LoginFailed = () => {
  return (
    <>
      <h1 style={{ marginTop: "6rem", marginBottom: "6rem" }}>LoginFailed</h1>
      <Link to="/login">Go back to login page</Link>
    </>
  );
};

export default LoginFailed;
