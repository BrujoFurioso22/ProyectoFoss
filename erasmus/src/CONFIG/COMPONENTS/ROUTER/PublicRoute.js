import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "CONFIG/context/authcontext";
import { ROUTES } from "CONFIG/ROUTES/paths";

export default function PublicRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    const tipoUsu = localStorage.getItem("tipo");
    const vf = tipoUsu === "ADM" ;
    if (vf) {
      return <Navigate to={ROUTES.ADMINISTRADOR} />;
    } else {
      return <Navigate to={ROUTES.PRINCIPAL} />;
    }
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
