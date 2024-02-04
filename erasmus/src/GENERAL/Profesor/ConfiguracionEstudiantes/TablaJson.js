import React from "react";
import styled from "styled-components";
import { EliminarAsignacion } from "CONFIG/BACKEND/Consultas/Profesor";

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 3px 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: var(--color-p);
    color: white;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

const ButtonStyled = styled.button`
  border: none;
  border-radius: 15px;
  padding: 7px 12px;
  background-color: transparent;
  &:hover {
    background-color: rgba(223, 223, 223, 0.73);
  }
`;

export const TablaJson = ({
  jsonData = [],
  columnasOcultas = [],
  nombresPersonalizados = {},
  consultaDatos = null,
}) => {
  const cabeceras =
    jsonData.length > 0
      ? Object.keys(jsonData[0])
      : Object.keys(nombresPersonalizados);
  const columnasMostradas = columnasOcultas.length
    ? cabeceras.filter((columna) => !columnasOcultas.includes(columna))
    : cabeceras;

  const idLocalStorage = localStorage.getItem("id");
  const eliminarEstudiantedeProfesor = async (item) => {
    await EliminarAsignacion(
      item.idestudiantes,
      idLocalStorage,
      consultaDatos
    );
  };
  return (
    <Tabla>
      <thead>
        <tr>
          {columnasMostradas.map((titulo, index) => (
            <th key={index}>{nombresPersonalizados[titulo] || titulo}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jsonData.length === 0 ? (
          <tr>
            <td colSpan={cabeceras.length + 1}>Ningun elemento encontrado</td>
          </tr>
        ) : (
          <>
            {jsonData.map((fila, index) => (
              <tr key={index}>
                {columnasMostradas.map((columna, i) => (
                  <td key={i}>{fila[columna]}</td>
                ))}
                <td>
                  <ButtonStyled
                    onClick={() => eliminarEstudiantedeProfesor(fila)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </ButtonStyled>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Tabla>
  );
};
