import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import PropTypes from "prop-types";
const Logged = "Autenticado";

export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(Logged) ?? false
  );

  const login = useCallback(function (usuario) {
    localStorage.setItem(Logged, true);
    // localStorage.setItem("modulos", modulos);
    if(usuario.tipodeusuario === "PR"){
      localStorage.setItem("id", usuario.idprofesores);
    }else if(usuario.tipodeusuario === "EST"){
      localStorage.setItem("id", usuario.idestudiantes);
    }else{
      localStorage.setItem("id", usuario.idadministrador);

    }
    localStorage.setItem("correo", usuario.correo);
    localStorage.setItem("contrasena", usuario.contrasena);
    localStorage.setItem("tipo",usuario.tipodeusuario)
    localStorage.setItem("nombre",usuario.nombre)
    // localStorage.setItem("identificador", identificador);
    setIsAuthenticated(true);
  }, []);
  const logout = useCallback(function () {
    localStorage.removeItem(Logged);
    // localStorage.removeItem("modulos");
    localStorage.removeItem("id");
    localStorage.removeItem("correo");
    localStorage.removeItem("contrasena");
    localStorage.removeItem("tipo")
    localStorage.removeItem("nombre")
    // localStorage.removeItem("identificador");
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
    }),
    [login, logout, isAuthenticated]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
