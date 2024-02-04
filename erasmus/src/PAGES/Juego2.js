import React ,{useState,useEffect}from "react";
import styled from "styled-components";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import { Sidebar } from "GENERAL/ComponentesGenerales/Sidebar/Sidebar";
import { Game2 } from "GENERAL/JUEGOS/Juego2Memoria/Game2";
import { ContenedorPrincipal, ContenedorHome,ContenedorSecciones } from "STYLED-COMPONENTS/Estructura";
import { ConsultaSiTieneProfesor } from "CONFIG/BACKEND/Consultas/Juegos";
import { PaginaSinAsignacion } from "./PaginaSinAsignacion"
import { Loader } from "STYLED-COMPONENTS/Loader/loader";
const ContenedorLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`


export const Juego2 = () => {
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
        {asignado === null ? <ContenedorLoader><Loader/></ContenedorLoader> : asignado === true ?<Game2 /> : <PaginaSinAsignacion />}
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
