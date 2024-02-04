import React from "react";
import styled from "styled-components";

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  /* table-layout: fixed; */

  th,
  td {
    padding: 3px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: var(--color-p);
    color: white;
  }
  tr {
    width: 100%;
  }

  tr:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;
const TablaTotal = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  height: 20px;
  table-layout: fixed;

  th,
  td {
    padding: 3px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: var(--color-p);
    color: white;
  }

  tr:hover {
    cursor: pointer;
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

export const TablaJsonReportes = ({
  jsonData = [],
  columnasOcultas = [],
  nombresPersonalizados = {},
  estudianteConsulta = null,
}) => {
  const cabeceras =
    jsonData.length > 0
      ? Object.keys(jsonData[0])
      : Object.keys(nombresPersonalizados);
  const columnasMostradas = columnasOcultas.length
    ? cabeceras.filter((columna) => !columnasOcultas.includes(columna))
    : cabeceras;

  return (
    <Tabla>
      <thead>
        <tr>
          {columnasMostradas.map((titulo, index) => (
            <th key={index}>{nombresPersonalizados[titulo] || titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {jsonData.length === 0 ? (
          <tr>
            <td colSpan={cabeceras.length}>Ningun elemento encontrado</td>
          </tr>
        ) : (
          <>
            {jsonData.map((fila, index) => (
              <tr key={index} onClick={() => estudianteConsulta(fila)}>
                {columnasMostradas.map((columna, i) => (
                  <td key={i}>{fila[columna]}</td>
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Tabla>
  );
};

export const TablaJsonReportesEstudiantes = ({
  jsonData = [],
  columnasOcultas = [],
  nombresPersonalizados = {},
}) => {
  const cabeceras =
    jsonData.length > 0
      ? Object.keys(jsonData[0])
      : Object.keys(nombresPersonalizados);
  const columnasMostradas = columnasOcultas.length
    ? cabeceras.filter((columna) => !columnasOcultas.includes(columna))
    : cabeceras;

  return (
    <Tabla>
      <thead>
        <tr>
          {columnasMostradas.map((titulo, index) => (
            <th key={index}>{nombresPersonalizados[titulo] || titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {jsonData.length === 0 ? (
          <tr>
            <td colSpan={cabeceras.length}>Ningun elemento encontrado</td>
          </tr>
        ) : (
          <>
            {jsonData.map((fila, index) => (
              <tr key={index}>
                {columnasMostradas.map((columna, i) => (
                  <td key={i}>{fila[columna]}</td>
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Tabla>
  );
};

export const TablaJsonReportesTotal = ({
  jsonData = [],
  columnasOcultas = [],
  nombresPersonalizados = {},
}) => {
  const cabeceras =
    jsonData.length > 0
      ? Object.keys(jsonData[0])
      : Object.keys(nombresPersonalizados);
  const columnasMostradas = columnasOcultas.length
    ? cabeceras.filter((columna) => !columnasOcultas.includes(columna))
    : cabeceras;

  return (
    <TablaTotal>
      <tbody>
        {jsonData.length === 0 || jsonData[0].totCalificacion === null ? (
          <tr>
            <td colSpan={cabeceras.length}>Calculando ...</td>
          </tr>
        ) : (
          <>
            {jsonData.map((fila, index) => (
              <tr key={index}>
                <td>Total</td>
                {columnasMostradas.map((columna, i) => (
                  <td key={i}>{fila[columna]}</td>
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </TablaTotal>
  );
};
