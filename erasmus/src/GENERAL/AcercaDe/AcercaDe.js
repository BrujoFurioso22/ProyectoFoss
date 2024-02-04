import React from "react";
import styled from "styled-components";
import logo1 from "SOURCES/diego.svg";
import logo2 from "SOURCES/pedro.svg";
import logo3 from "SOURCES/tef.svg";

// Estilos para el componente
const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: whitesmoke;
  margin-top: 15px;
  border-radius: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Description = styled.p`
  color: #666;
`;

const TeamList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const TeamMember = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.14);
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  gap: 20px;

  .contenedorImagen{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color:rgba(0, 0, 0, 0.20);
    padding: 10px;
    border-radius: 20px;
    span {
    font-weight: 600;
    }
  }
  .contenedorInfo{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

`;

const Image = styled.img`
  width: 80px;
  border-radius: 50%;
`;

// Componente principal
export const AcercaDe = () => {
  return (
    <AboutContainer>
      <Title>Acerca De Nosotros</Title>
      <Description>
        Bienvenido a nuestra página de "Acerca De". Aquí encontrarás información
        sobre nuestro equipo de trabajo.
      </Description>
      <Description>Proyecto Estimulación Visual</Description>

      <TeamList>
        <TeamMember>
          <div className="contenedorImagen">
            <Image src={logo1} alt="Miembro 1" />
            <span>Diego Barbecho</span>
          </div>
          <div className="contenedorInfo">
            <span>diego.barbecho@es.uazuay.edu.ec</span>
          </div>
        </TeamMember>
        <TeamMember>
          <div className="contenedorImagen">
            <Image src={logo2} alt="Miembro 2" />
            <span>Pedro Figueroa</span>
          </div>
          <div className="contenedorInfo">
            <span>pedro.figueroa@es.uazuay.edu.ec</span>
          </div>
        </TeamMember>
        <TeamMember>
          <div className="contenedorImagen">
            <Image src={logo3} alt="Miembro 3" />
            <span>Sthefany Peñafiel</span>
          </div>
          <div className="contenedorInfo">
            <span>sthefanyyt@es.uazuay.edu.ec</span>
          </div>
        </TeamMember>
      </TeamList>
    </AboutContainer>
  );
};
