import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TablaJson } from "./TablaJson";
import { ContendorPadre } from "STYLED-COMPONENTS/Estructura";
import {
  ConsultaEstudiantes,
  ConsultaIDEstudiante,
  CrearAsignacion,
} from "CONFIG/BACKEND/Consultas/Profesor";

const ContenedorTabs = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  height: 100%;
  padding: 40px;

  .contenedorTablas {
    display: flex;
    background-color: whitesmoke;
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
  }
`;

const nombresPersonalizados = {
  nombre: "Nombre Estudiante",
  correo: "Correo",
  institucion: "Institución",
  sexo: "Sexo",
};

const InputStyled = styled.input`
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  color: black;
  outline: none;
`;

const ButtonStyled = styled.button`
  border-radius: 8px;
  border: none;
  padding: 5px 10px;
  background-color: var(--color-boton);
  color: white;
`;

export const ConfigEstudiantes = () => {
  const [correoEst, setCorreoEst] = useState("");
  const [data, setData] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const idLocalStorage = localStorage.getItem("id");

  const ConsultaEstudiantesTabla = async () => {
    const datos = await ConsultaEstudiantes(idLocalStorage);
    setData(datos);
  };

  const ConsultarExistenciaEstudiante = async (correo) => {
    if (correo !== "") {
      const valid = await ConsultaIDEstudiante(correo);

      if (valid.length > 0) {
        const idEst = valid[0].idestudiantes;
        const mensaje = await CrearAsignacion(
          idEst,
          idLocalStorage,
          ConsultaEstudiantesTabla
        );
        // console.log(mensaje);
        mensaje.data.message === "Usuario ya asignado" &&
          setMensaje("*El estudiante ya esta asignado");
        setTimeout(() => {
          setMensaje("");
        }, 5000);
        setCorreoEst("")
      } else {
        setMensaje("*Correo Invalido");
      }
    }
  };

  useEffect(() => {
    ConsultaEstudiantesTabla();
  }, []);
  
  return (
    <ContendorPadre>
      <ContenedorTabs>
        <h2 style={{color:"white"}}>Configuración Estudiantes</h2>
        <ContendorPadre
          style={{
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <InputStyled
            type="text"
            placeholder="Correo estudiante"
            value={correoEst}
            onChange={(e) => setCorreoEst(e.target.value)}
          />

          <ButtonStyled
            onClick={() => ConsultarExistenciaEstudiante(correoEst)}
          >
            Agregar
          </ButtonStyled>
          <label style={{fontSize:"1rem", color:"red"}}>{mensaje}</label>
        </ContendorPadre>
        <div className="contenedorTablas">
          <TablaJson
            jsonData={data}
            columnasOcultas={["idestudiantes"]}
            nombresPersonalizados={nombresPersonalizados}
            consultaDatos={ConsultaEstudiantesTabla}
          />
        </div>
      </ContenedorTabs>
    </ContendorPadre>
  );
};
