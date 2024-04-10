import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { RootState } from "../Redux/store";
interface AuthRoutesProps {
  allowListedRoles: string[];
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ allowListedRoles }) => {
  const { role } = useSelector((state: RootState) => state.auth); // get the role of the current user from state

  return (
    <>
      {allowListedRoles.includes(role) ? <Outlet /> : <div>Access Denied</div>}
    </>
  );
};

export default AuthRoutes;
