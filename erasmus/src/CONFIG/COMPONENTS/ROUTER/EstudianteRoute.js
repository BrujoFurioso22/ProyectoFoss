import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "CONFIG/context/authcontext";
import { ROUTES } from "CONFIG/ROUTES/paths";

export default function EstudianteRoute() {
  const { isAuthenticated } = useAuthContext();

  const tipoUsu = localStorage.getItem("tipo");
  const vf = tipoUsu === "EST" ? true : false;
  

  if (isAuthenticated === false || vf === false) {
    return <Navigate to={ROUTES.PRINCIPAL} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
