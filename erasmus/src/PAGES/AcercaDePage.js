import React from "react";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import { Sidebar } from "GENERAL/ComponentesGenerales/Sidebar/Sidebar";
import { AcercaDe } from "GENERAL/AcercaDe/AcercaDe";
import {
  ContenedorPrincipal,
  ContenedorHome,
  ContenedorSecciones,
} from "STYLED-COMPONENTS/Estructura";

export const AcercaDePage = () => {
  return (
    <ContenedorPrincipal>
      <Sidebar />
      <ContenedorHome>
        <Header />
        <ContenedorSecciones>
          <AcercaDe />
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
