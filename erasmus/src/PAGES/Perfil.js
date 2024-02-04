import React from "react";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import { Sidebar } from "GENERAL/ComponentesGenerales/Sidebar/Sidebar";
import { AdministrarPerfil } from "GENERAL/Perfil/AdministrarPerfil";
import {
  ContenedorPrincipal,
  ContenedorHome,
  ContenedorSecciones,
} from "STYLED-COMPONENTS/Estructura";

export const Perfil = () => {
  return (
    <ContenedorPrincipal>
      <Sidebar />
      <ContenedorHome>
        <Header />
        <ContenedorSecciones>
          <AdministrarPerfil />
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
