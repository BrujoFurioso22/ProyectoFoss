import React, { useState } from "react";
import styled from "styled-components";

// import {
//   Container,
//   ContainerPadre,
//   FormContainer,
//   Overlay,
//   OverlayContainer,
//   OverlayPanel,
//   SignInContainer,
//   SignUpContainer,
// } from "STYLED-COMPONENTS/Login";
import "GENERAL/Login_Registro/LoginReg.css";


import { Registrarse } from "GENERAL/Login_Registro/RegistrarseForm";
import { InicioSesion } from "GENERAL/Login_Registro/InicioSesionForm";

const ContendorPadre = styled.div`
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;  
`;

export const LoginRegistro = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <ContendorPadre>
      <div className={containerClass} id="container">
        <Registrarse />
        <InicioSesion />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1Login">Bienvenido!</h1>
              <p className="pLogin">
                ¿Ya tienes una cuenta? Inicia sesión ahora.
              </p>
              <button
                className="botonLogin ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1Login">Hola, ¿necesitas una cuenta?</h1>
              <p className="pLogin">Llena la información necesaria para registrarte en nuestra plataforma</p>
              <button
                className="botonLogin ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </ContendorPadre>
  );
};
