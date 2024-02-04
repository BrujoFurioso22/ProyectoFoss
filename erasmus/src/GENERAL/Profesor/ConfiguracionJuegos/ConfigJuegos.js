import React, { useState } from "react";
import styled from "styled-components";
import { ContendorPadre } from "STYLED-COMPONENTS/Estructura";
import {
  SeccionesConf1,
  SeccionesConf2,
  SeccionesConf3,
  SeccionesConf4,
} from "./JuegosConf/SeccionesConf";

const ContenedorTabs = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  column-gap: 20px;
  width: 100%;
  height: 100%;
  padding: 40px;

  .tabs {
    list-style: none;
    display: flex;
    box-shadow: 0 10px 20px -2px rgba(0, 0, 0, 0.32);
    position: relative;
    row-gap: 40px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    top: 0;
    left: 0;
    padding: 40px;
    border-radius: 15px;
    background-color: whitesmoke;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.13);
      padding: 16px 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.7s ease;
      user-select: none;
      column-gap: 8px;

      &.active {
        background-color: var(--color-p);
        color: white;
      }
    }
  }
`;

const ContenedorConfiguraciones = styled.div`
  display: flex;
  box-shadow: 0 10px 20px -2px rgba(0, 0, 0, 0.32);
  padding: 20px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-width: 500px;
  border-radius: 15px;
  background-color: whitesmoke;
  transition: all 2s ease;

`;

export const ConfigJuegos = () => {
  const [activeTab, setActiveTab] = useState(0);
  const seleccionar = (index) => {
    setActiveTab(index);
  };
  return (
    <ContendorPadre
      style={{
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "20px",
      }}
    >
      <h2 style={{color:"white"}}>Configuración de Juegos </h2>
      <ContenedorTabs>
        <ul className="tabs">
          <li
            className={activeTab === 0 ? "active" : ""}
            onClick={() => seleccionar(0)}
          >
            <i className="bi bi-gear-fill"></i> 1
          </li>
          <li
            className={activeTab === 1 ? "active" : ""}
            onClick={() => seleccionar(1)}
          >
            <i className="bi bi-gear-fill"></i> 2
          </li>
          <li
            className={activeTab === 2 ? "active" : ""}
            onClick={() => seleccionar(2)}
          >
            <i className="bi bi-gear-fill"></i> 3
          </li>
          <li
            className={activeTab === 3 ? "active" : ""}
            onClick={() => seleccionar(3)}
          >
            <i className="bi bi-gear-fill"></i> 4
          </li>
        </ul>
        <ContenedorConfiguraciones>
          {activeTab === 0 && <SeccionesConf1 />}
          {activeTab === 1 && <SeccionesConf2 />}
          {activeTab === 2 && <SeccionesConf3 />}
          {activeTab === 3 && <SeccionesConf4 />}
        </ContenedorConfiguraciones>
      </ContenedorTabs>
    </ContendorPadre>
  );
};
