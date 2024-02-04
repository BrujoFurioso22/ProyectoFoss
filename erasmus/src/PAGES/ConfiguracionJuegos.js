import React from "react";
import styled from "styled-components";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import { Sidebar } from "GENERAL/ComponentesGenerales/Sidebar/Sidebar";
import { ConfigJuegos } from "GENERAL/Profesor/ConfiguracionJuegos/ConfigJuegos";
import { ContenedorPrincipal, ContenedorHome,ContenedorSecciones } from "STYLED-COMPONENTS/Estructura";

export const ConfiguracionJuegos = () => {
  return (
    <ContenedorPrincipal>
      <Sidebar />
      <ContenedorHome>
        <Header />
        <ContenedorSecciones>
          <ConfigJuegos/>
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
