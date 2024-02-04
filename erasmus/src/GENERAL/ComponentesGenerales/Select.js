import React from "react";
import styled from "styled-components";

const Select = styled.select`
  padding: 8px 12px;
  outline: none;
  border-radius: 15px;
`;


export const SeleccionarAlgo = ({
  tituloSeleccionar,
  primeraOpcion,
  options,
  id,
  etiqueta,
  setValor,
  opcionSeleccionada,
}) => {
  return (
    <div style={{padding: "0 15px"}}>
      <span>{tituloSeleccionar}</span>
      <Select value={opcionSeleccionada} onChange={(e)=>setValor(e.target.value)}>
        <option value="">{primeraOpcion}</option>
        {options.map((item, index) => (
          <option key={index} value={item[id]}>
            {item[etiqueta]}
          </option>
        ))}
      </Select>
    </div>
  );
};
