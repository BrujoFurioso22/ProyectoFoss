import styled from "styled-components";
import fondo from "SOURCES/Fondo.png";

export const ContenedorPrincipal = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
`;

export const ContenedorHome = styled.div`
  display: inline-block;
  width: 100%;
  height: calc(100vh);
`;

export const ContenedorSecciones = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 50px);
  background: linear-gradient(
      to bottom,
      rgba(59, 111, 208, 0.23),
      rgba(0, 255, 255, 0.16)
    ),
    url("https://img.freepik.com/vector-gratis/fondo-nube-vector-estilo-corte-papel-pastel_53876-135914.jpg?w=900&t=st=1705361240~exp=1705361840~hmac=ce42ca9d96033bed4a2b11c7fbef937fa895bd643b1b601356018e4da09ee03f");
  background-repeat: no-repeat;
  background-position: center ;
  background-size: cover;
  animation: background 0.8s ease;
  @keyframes background {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
    
  }
`;

export const ContendorPadre = styled.div`
  display: flex;
  width: 100%;
`;
