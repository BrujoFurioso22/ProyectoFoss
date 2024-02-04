import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "CONFIG/context/authcontext";
import { ROUTES } from "CONFIG/ROUTES/paths";

export default function ProfesorRoute() {
  const { isAuthenticated } = useAuthContext();
  const tipoUsu = localStorage.getItem("tipo");
  const vf = tipoUsu === "PR" ? true : false;

  if (isAuthenticated === false || vf === false) {
    return <Navigate to={ROUTES.PRINCIPAL} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
