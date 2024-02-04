import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import { Sidebar } from "GENERAL/ComponentesGenerales/Sidebar/Sidebar";
import { Game1 } from "GENERAL/JUEGOS/Juego1Direcciones/Game1";
import { Game1Handtrack } from "GENERAL/JUEGOS/Juego1Direcciones/Game1Handtrack";
import {
  ContenedorPrincipal,
  ContenedorHome,
  ContenedorSecciones,
} from "STYLED-COMPONENTS/Estructura";
import { ConsultaSiTieneProfesor } from "CONFIG/BACKEND/Consultas/Juegos";
import { PaginaSinAsignacion } from "./PaginaSinAsignacion";
import { Loader } from "STYLED-COMPONENTS/Loader/loader";

const ContenedorLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Juego1 = () => {
  const [asignado, setAsignado] = useState(null);

  const VerificarSiTieneProfesor = async () => {
    const resp = await ConsultaSiTieneProfesor(localStorage.getItem("id"));
    if (resp.length > 0) {
      setAsignado(true);
    }else{
      setAsignado(false)
    }
  };
  useEffect(() => {
    VerificarSiTieneProfesor();
  }, []);

  return (
    <ContenedorPrincipal>
      <Sidebar />
      <ContenedorHome>
        <Header />
        <ContenedorSecciones>
          {/* {asignado ? <Game1 /> : <PaginaSinAsignacion />} */}
          {asignado === null ? <ContenedorLoader><Loader/></ContenedorLoader> : asignado === true ?<Game1Handtrack /> : <PaginaSinAsignacion />}
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
