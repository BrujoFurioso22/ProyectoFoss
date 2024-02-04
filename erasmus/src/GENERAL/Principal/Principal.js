import React from "react";
import styled from "styled-components";
import { SeccionesJuegos } from "GENERAL/Principal/SeccionesJuegos";
import { ROUTES } from "CONFIG/ROUTES/paths";
import imgJuegoDirecciones from 'SOURCES/JuegoDirecciones.jpg'
import imgJuegoMemoria from 'SOURCES/JuegoMemoria.jpg'
import imgJuegoPizarron from 'SOURCES/JuegoPizarron.jpg'
import imgJuegoGlobos from 'SOURCES/JuegoGlobos.jpg'
const ContenedorPrincipal = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center ;
  padding-top: 2rem;

  flex-direction: column;
  height: calc(100vh - 50px);
`;

const ContenedorJuegos = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const juegos = [
  {
    nombre: "Direcciones",
    path: ROUTES.JUEGOS.J1,
    img: imgJuegoDirecciones,
  },
  {
    nombre: "Memoria",
    path: ROUTES.JUEGOS.J2,
    img: imgJuegoMemoria,
  },
  {
    nombre: "Pizarrón",
    path: ROUTES.JUEGOS.J3,
    img: imgJuegoPizarron,
  },
  {
    nombre: "Globos Colores",
    path: ROUTES.JUEGOS.J4,
    img: imgJuegoGlobos,
  },
];
export const Principal = () => {
  return (
    <ContenedorPrincipal>
      <h1 style={{color:"white", padding:"10px 0"}}>Bienvenido, Listo para jugar?</h1>

      <ContenedorJuegos>
        {juegos.map((item, index) => (
          <SeccionesJuegos key={index} juego={item} conteo={index} />
        ))}
      </ContenedorJuegos>
    </ContenedorPrincipal>
  );
};
