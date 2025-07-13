import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("current User in Protected Admin Route ====> ", currentUser)
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}
