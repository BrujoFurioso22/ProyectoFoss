import React from "react";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import { Sidebar } from "GENERAL/ComponentesGenerales/Sidebar/Sidebar";
import { Principal } from "GENERAL/Principal/Principal";
import { PrincipalProfesor } from "GENERAL/Principal/PrincipalProfesor";
import {
  ContenedorPrincipal,
  ContenedorHome,
  ContenedorSecciones,
} from "STYLED-COMPONENTS/Estructura";

export const PrincipalPage = () => {
    const tipoUsu= localStorage.getItem("tipo")
  return (
    <ContenedorPrincipal>
      <Sidebar />
      <ContenedorHome>
        <Header />
        <ContenedorSecciones>
            {tipoUsu === "EST" ? <Principal/> : <PrincipalProfesor/>}
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
