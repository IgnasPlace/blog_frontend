import { UserType } from "../store";
import { Navigate, Outlet } from "react-router-dom";

type PropsType = {
  user: UserType | null;
  redirectPath: string;
};

const AnonymousRoute = (props: PropsType) => {
  return props.user ? <Navigate to={props.redirectPath} replace /> : <Outlet />;
};

export default AnonymousRoute;
