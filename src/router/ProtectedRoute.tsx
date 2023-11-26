import { UserType } from "../store";
import { Navigate, Outlet } from "react-router-dom";

type PropsType = {
  user: UserType | null;
  redirectPath: string;
};

const ProtectedRoute = (props: PropsType) => {
  return props.user ? <Outlet /> : <Navigate to={props.redirectPath} replace />;
};

export default ProtectedRoute;
