
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
  // return  <Outlet />
};

export default PrivateRoute;
