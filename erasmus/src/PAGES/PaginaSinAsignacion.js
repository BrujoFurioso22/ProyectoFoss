import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "CONFIG/ROUTES/paths";

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5% 10% 0;
  h1 {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
  }
`;
const Boton = styled(Link)`
  padding: 12px 25px;
  border: none;
  background-color: var(--color-boton);
  color: white;
  border-radius: 20px;
  text-decoration: none;
`;
const Titulo = styled.h2`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
`;

const text =
  "No tiene ningun profesor asignado, consulte con su profesor para poder solucionar el problema";

export const PaginaSinAsignacion = () => {
  const DecirTexto = (text, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(text);

        // Personalizar la voz
        const voices = synth.getVoices();
        utterThis.voice = voices.find((voice) => voice.lang === "es-ES");

        // Establecer el idioma
        utterThis.lang = "es-ES";
        utterThis.rate = 0.7;

        // Hablar el texto
        synth.speak(utterThis);

        // Manejar el evento onend
        utterThis.onend = () => {
          console.log("La síntesis de voz ha terminado");
          // Resolver la promesa cuando termine la síntesis de voz
          resolve();
        };

        // Manejar cualquier error
        utterThis.onerror = (error) => {
          console.error("Error en la síntesis de voz", error);
          // Rechazar la promesa en caso de error
          reject(error);
        };
      }, delay);
    });
  };

  useEffect(() => {
    DecirTexto(text, 500);
  }, []);

  return (
    <Contenedor>
      <Titulo>
        {text}{" "}
        <i
          style={{ cursor: "pointer" }}
          onClick={() => DecirTexto(text, 500)}
          className="bi bi-volume-up-fill"
        ></i>
      </Titulo>
      <Boton to={ROUTES.PRINCIPAL}>{"<- "} Regresar</Boton>
    </Contenedor>
  );
};
