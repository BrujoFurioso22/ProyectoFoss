import styled from "styled-components";
import React from "react";

const ContenedorImagenesArrastradas = styled.div`
  background-color: var(--color-p);
  min-width: 200px;
  max-width: 100%;
  width: max-content;
  height: auto;
  min-height: 100px;
  display: block;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px dashed rgb(0, 0, 0);
`;

const DestinoContenedor = styled.div`
  user-select: none;
  max-width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  z-index: 50;
  padding: 10px 25px;
  gap: 20px;

  .destino-imagen {
    object-fit: contain;
    width: auto;
    height: 4.5rem;
    filter: drop-shadow(5px 5px 6px #515151);
  }
  .destino-contenedor:hover {
    cursor: not-allowed;
  }
`;

const ContenedorDestino = ({ imagenesEnContenedor, dejar, removeImage }) => {
  const handleDrop = () => {
    dejar();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageClick = (id) => {
    // Eliminar la imagen del estado imagenesEnContenedor
    const nuevasImagenes = imagenesEnContenedor.filter(
      (imagen) => imagen.idimagenes !== id
    );
    removeImage(nuevasImagenes);
  };

  return (
    <ContenedorImagenesArrastradas
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <DestinoContenedor>
        {imagenesEnContenedor.map((imagen) => (
          <img
            key={imagen.idimagenes}
            onClick={() => handleImageClick(imagen.idimagenes)}
            className="destino-imagen"
            src={imagen.rutaimagen}
            alt={imagen.nombreimagen}
          />
        ))}
      </DestinoContenedor>
    </ContenedorImagenesArrastradas>
  );
};

export default ContenedorDestino;
