import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ContendorPadre } from "STYLED-COMPONENTS/Estructura";
import { ConsultarUsuario } from "CONFIG/BACKEND/Consultas/LoginRegister";
const ContenedorN1 = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
`;

const ContenedorN2 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

// Estilos para el componente
const ImageContainer = styled.div`
  text-align: center;
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 20px;
`;

const ChangeImageButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const InputStyled = styled.input`
  min-width: 120px;
  padding: 8px 15px;
  border: 1px solid rgba(71, 71, 71, 0.15);
  background-color: white;
  border-radius: 12px;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 35px 45px;
  background-color: whitesmoke;
  row-gap: 10px;
  border-radius: 20px;
  div {
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    align-items: center;
    label {
      font-weight: 600;
    }
  }
`;

export const AdministrarPerfil = () => {
  // Estado para la URL de la imagen
  const [imageURL, setImageURL] = useState("url_de_tu_imagen_inicial.jpg");
  const fileInputRef = useRef(null);
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    institucion: "",
    sexo: "",
    cedula: "",
    correo: "",
    contrasena: "",
  });

  const ConsultarDatosUsuario = async () => {
    const datos = await ConsultarUsuario(
      localStorage.getItem("correo"),
      localStorage.getItem("contrasena")
    );

    datos.length > 0 && SetearDatos(datos[0]);
  };

  useEffect(() => {
    ConsultarDatosUsuario();
  }, []);

  const SetearDatos = (datos) => {
    // console.log(datos);

    setDatosUsuario({
      nombre: datos.nombre,
      institucion: datos.institucion,
      cedula: datos.cedula,
      sexo: datos.sexo === "F" ? "Femenino":"Masculino",
      correo: datos.correo,
      contrasena: datos.contrasena,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageURL(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    // Simula un clic en el input al hacer clic en el botón
    fileInputRef.current.click();
  };
  return (
    <ContendorPadre
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        paddingTop:"2rem"
      }}
    >
      <h2 style={{color:"white"}}>Información Perfil</h2>
      <ContenedorN1>
        <ContenedorN2>
          <FormStyled>
            <div>
              <label>Nombre</label>
              <InputStyled type="text" value={datosUsuario.nombre} />
            </div>
            <div>
              <label>Institución</label>
              <InputStyled type="text" value={datosUsuario.institucion} />
            </div>
            <div>
              <label>Cédula</label>
              <InputStyled type="text" value={datosUsuario.cedula} />
            </div>
            <div>
              <label>Sexo</label>
              <InputStyled type="text" value={datosUsuario.sexo} />
            </div>
            <div>
              <label>Correo</label>
              <InputStyled type="text" value={datosUsuario.correo} />
            </div>
            <div>
              <label>Contraseña</label>
              <InputStyled type="password" value={datosUsuario.contrasena} />
            </div>
          </FormStyled>
        </ContenedorN2>
      </ContenedorN1>
    </ContendorPadre>
  );
};
