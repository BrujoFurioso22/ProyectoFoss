import React from "react";
import styled from "styled-components";
import { EliminarAsignacion } from "CONFIG/BACKEND/Consultas/Profesor";
import { CambiarEstadoImagen } from "CONFIG/BACKEND/Consultas/Administrador";

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  

  th,
  td {
    padding: 3px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: rgba(21, 78, 210, 1);
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

export const TablaJsonImgs = ({
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

  const CambEstadoImagenes = async (item) => {
    await CambiarEstadoImagen(
      item.idimagenes,
      item.estado === 0 ? 1 : 0,
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
              <tr
                key={index}
                style={{
                  background: fila.estado === 1
                    ? "linear-gradient(to right,rgba(33, 255, 44, 0.3), rgba(8, 175, 2, 0.5)), white"
                    : "linear-gradient(to right,rgba(255, 33, 33, 0.3), rgba(189, 0, 0, 0.5)), white"
                }}
              >
                {columnasMostradas.map((columna, i) => (
                  <td key={i}>{fila[columna]}</td>
                ))}
                <td>
                  <ButtonStyled onClick={() => CambEstadoImagenes(fila)}>
                    {fila.estado === 0 ? (
                      <i className="bi bi-plus-circle"></i>
                    ) : (
                      <i className="bi bi-dash-circle"></i>
                    )}
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
