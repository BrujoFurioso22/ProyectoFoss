import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContenedorSeccion = styled(Link)`
  width: 300px;
  background-color: var(--color-boton);
  margin: 20px;
  border-radius: 20px;
  user-select: none;
  text-decoration: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.29);
  transition: all 0.4s ease;

  &:hover {
    box-shadow: 0px 0px 8px 8px var(--color-p);
    animation: wobble-hor-bottom 2s infinite both;
  }
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
    height: 10rem;
  }
  @keyframes wobble-hor-bottom {
    0%,
    100% {
      transform: translateX(0%);
      transform-origin: 50% 50%;
    }
    15% {
      transform: translateX(-30px) rotate(-6deg);
    }
    30% {
      transform: translateX(15px) rotate(6deg);
    }
    45% {
      transform: translateX(-15px) rotate(-3.6deg);
    }
    60% {
      transform: translateX(9px) rotate(2.4deg);
    }
    75% {
      transform: translateX(-6px) rotate(-1.2deg);
    }
  }
`;

const ContenedorSeccionInterior = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  gap: 12px;
  text-align: center;
  padding: 20px 0;
`;

const BotonJugar = styled(Link)`
  background-color: transparent;
  border: none;
  width: 120px;
  padding: 30px 5px 30px 15%;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    h3 {
      transform: translateX(50px) scale(1.1);
    }
  }
`;

const StyledH3 = styled.h3`
  transition: transform 0.3s ease;
`;

export const SeccionesJuegos = ({ juego, conteo }) => {
  return (
    <ContenedorSeccion to={juego.path}>
      <img alt="img" src={juego.img}></img>
      <ContenedorSeccionInterior>
        <StyledH3>{juego.nombre}</StyledH3>
      </ContenedorSeccionInterior>
    </ContenedorSeccion>
  );
};
