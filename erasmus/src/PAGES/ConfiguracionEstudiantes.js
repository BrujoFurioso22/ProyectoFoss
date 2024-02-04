import React from "react";
import styled from "styled-components";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import { Sidebar } from "GENERAL/ComponentesGenerales/Sidebar/Sidebar";
import { ConfigEstudiantes } from "GENERAL/Profesor/ConfiguracionEstudiantes/ConfigEstudiantes";
import { ContenedorPrincipal, ContenedorHome,ContenedorSecciones } from "STYLED-COMPONENTS/Estructura";

export const ConfiguracionEstudiantes = () => {
  return (
    <ContenedorPrincipal>
      <Sidebar />
      <ContenedorHome>
        <Header />
        <ContenedorSecciones>
          <ConfigEstudiantes/>
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
