import React, { useEffect, useState } from "react";
import { Header } from "GENERAL/ComponentesGenerales/Header/header";
import {
  ContenedorPrincipal,
  ContenedorHome,
  ContenedorSecciones,
} from "STYLED-COMPONENTS/Estructura";
import styled from "styled-components";
import { TablaJsonImgs } from "./TablaJsonImgs";
import {
  CargarImagen,
  ConsultaImagenesAdmin,
} from "CONFIG/BACKEND/Consultas/Administrador";

const nombresPersonalizados = {
  idimagenes: "ID",
  nombreimagen: "Nombre",
  rutaimagen: "Ruta",
  grupoimagen: "Pert. Juego",
  estado: "Deshab./Habil.",
};

const ContendorAdmin = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 10px;
  width: 100%;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const ContendorOpciones = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const BotonesOpciones = styled.button`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.activo === "true" ? "var(--color-boton)" : "white"};
  color: ${(props) => (props.activo === "true" ? "white" : "black")};
  border-radius: 15px;
  border: none;
  transition: all 0.6s ease;
`;

const ContenedorCargaImagenes = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  height: 80%;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.91);
`;
const Cont1 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 0;
  gap: 10px;
  overflow-y: auto;
`;

const TablaStyled = styled.table``;
const FormStyled = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  input[type="text"] {
    border: none;
    background-color: rgba(109, 109, 109, 0.25);
    border-bottom: 1px solid black;
    border-radius: 10px;
    padding: 2px 15px;
    outline: none;
  }
  label {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    span {
      font-size: 12px;
    }
  }
  .botonSubir {
    border: none;
    border-radius: 10px;
    background-color: var(--color-boton);
    color: white;
    padding: 4px 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.6);
    font-weight: 600;
    cursor: pointer;
  }
  input[type="submit"] {
    border: none;
    background-color: var(--color-p);
    border-radius: 10px;
    padding: 15px 15px;
    outline: none;
    font-weight: 700;
    color: var(--color-blanco);
  }
`;

const ContTabla = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const AdminPage = () => {
  const [activo, setActivo] = useState(1);
  const cambiarContenedor = (numero) => {
    setActivo(numero);
  };
  const SeccionesAdministrador = ({ nombre, juego }) => {
    const [data, setData] = useState([]);
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [mensaje, setMensaje] = useState("");

    const Consulta = async () => {
      const res = await ConsultaImagenesAdmin(juego);
      if (res.length > 0) {
        setData(res);
      }
    };
    useEffect(() => {
      Consulta();
    }, []);

    const HandleChangeArchivo = (target) => {
      console.log(target);
      if (target.length > 0) {
        const archivo = target[0];
        if (archivo.size > 0) {
          setArchivo(archivo);
        }
      }
    };

    const HandleNombreImagen = (value) => {
      setNombreArchivo(value);
    };

    const SubirImagenes = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("file", archivo);

      let nombreimagen = "";
      if (nombreArchivo.replace(" ", "").trim === "") {
        nombreimagen = archivo.name;
      } else {
        nombreimagen = nombreArchivo;
      }

      const res = await CargarImagen(activo, nombreimagen, formData, Consulta);
      if (res) {
        res.data.message === "Existente" &&
          setMensaje("*Ya existe ese nombre, intente otro");
        setTimeout(() => {
          setMensaje("");
        }, 4000);
        console.log(res);
      }
    };

    return (
      <Cont1>
        <h3>{nombre}</h3>
        <FormStyled onSubmit={SubirImagenes}>
          <input
            type="text"
            placeholder="Nombre Imagen"
            onChange={(e) => HandleNombreImagen(e.target.value)}
          />
          <label htmlFor="fileInput">
            <div className="botonSubir">Subir Archivo</div>
            <span>Archivo: {archivo ? archivo.name : "---"}</span>
          </label>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => HandleChangeArchivo(e.target.files)}
          />
          <input
            disabled={nombreArchivo === ""}
            style={{ display: archivo ? "flex" : "none" }}
            type="submit"
            value="Cargar Imagen"
          />
        </FormStyled>

        <span style={{ fontWeight: "13px", color: "red" }}>{mensaje}</span>
        <ContTabla>
          <TablaJsonImgs
            jsonData={data}
            nombresPersonalizados={nombresPersonalizados}
            consultaDatos={Consulta}
          />
        </ContTabla>
      </Cont1>
    );
  };
  return (
    <ContenedorPrincipal>
      <ContenedorHome>
        <Header />
        <ContenedorSecciones>
          <ContendorAdmin>
            <h4>Bienvenido {localStorage.getItem("nombre")}</h4>
            <ContendorOpciones>
              <BotonesOpciones
                activo={activo === 1 ? "true" : "false"}
                onClick={() => cambiarContenedor(1)}
              >
                Juego 1
              </BotonesOpciones>

              <BotonesOpciones
                activo={activo === 2 ? "true" : "false"}
                onClick={() => cambiarContenedor(2)}
              >
                Juego 2
              </BotonesOpciones>
              <BotonesOpciones
                activo={activo === 3 ? "true" : "false"}
                onClick={() => cambiarContenedor(3)}
              >
                Juego 3
              </BotonesOpciones>
              <BotonesOpciones
                activo={activo === 4 ? "true" : "false"}
                onClick={() => cambiarContenedor(4)}
              >
                Juego 4
              </BotonesOpciones>
            </ContendorOpciones>
            <ContenedorCargaImagenes>
              {activo === 1 && (
                <SeccionesAdministrador nombre="Juego1" juego={1} />
              )}
              {activo === 2 && (
                <SeccionesAdministrador nombre="Juego2" juego={2} />
              )}
              {activo === 3 && (
                <SeccionesAdministrador nombre="Juego3" juego={3} />
              )}
              {activo === 4 && (
                <SeccionesAdministrador nombre="Juego4" juego={4} />
              )}
            </ContenedorCargaImagenes>
          </ContendorAdmin>
        </ContenedorSecciones>
      </ContenedorHome>
    </ContenedorPrincipal>
  );
};
