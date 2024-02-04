import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import { Sidebar } from "GENERAL/ComponentesGenerales/Sidebar/Sidebar";
import { CanvasApp } from "GENERAL/JUEGOS/Juego3Pizarra/Canvas";
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


export const Juego3 = () => {
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
        <ContenedorSecciones >
          {asignado === null ? (
            <ContenedorLoader><Loader/></ContenedorLoader>
          ) : asignado === true ? (
            <CanvasApp />
          ) : (
            <PaginaSinAsignacion />
          )}
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
