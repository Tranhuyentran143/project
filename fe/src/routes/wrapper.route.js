import { Navigate, Outlet } from "react-router-dom";

const WrapperRoute = (props) => {
  const token = localStorage.getItem("token");

  return !token ? <Navigate to={"/login"} /> : <Outlet />;
};

export default WrapperRoute;