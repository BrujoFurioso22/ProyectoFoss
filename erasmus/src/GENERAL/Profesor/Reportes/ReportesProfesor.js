import {
  ConsultaEstudiantes,
  ConsultaReporteEstJuego,
  ConsultaReporteEstJuegoFecha,
  ConsultaReporteEstJuegoTotal,
  ConsultaReporteEstJuegoTotalFecha,
} from "CONFIG/BACKEND/Consultas/Profesor";
import {
  TablaJsonReportes,
  TablaJsonReportesEstudiantes,
  TablaJsonReportesTotal,
} from "./TablaJsonResportes";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import html2pdf from "html2pdf.js";

const ContenedorPrincipal = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 100%;
`;
const ContenedorSeccionPadre = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  flex-direction: row;
  height: 75%;
  width: 85%;
  gap: 20px;
`;
const ContenedorSeccion = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  flex-direction: row;
  height: 100%;
  background-color: var(--color-blanco);
  box-shadow: 0 0 20px 0 var(--color-box-shadow);
  border-radius: 20px;
`;
const ContenedorPestanas = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
  height: 100%;
  border-radius: 20px;
  .contenedor1 {
    display: flex;
    justify-content: space-between;
  }
`;
const ContenedorPestanasHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  border-radius: 20px;
  flex-wrap: wrap;
  background-color: white;
`;
const Pestanas = styled.button`
  padding: 5px 2em;
  border-radius: 20px 5px 0 0;
  margin-right: 1px;
  margin-top: 1px;
  border: none;
  outline: none;
  transition: all 0.5s ease;
  &.active {
    background-color: var(--color-boton);
    color: white;
    font-weight: 600;
  }
`;
const ContenedorPestanasCuerpo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 90%;
  border-radius: 20px;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const BotonDescargar = styled.button`
  background-color: var(--color-p);
  color: white;
  padding: 4px 15px;
  border: none;
  outline: none;
  border-radius: 12px;
`;
const ContenedorDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  border-top: 1px solid var(--color-negro);
  padding-top: 20px;
  input {
    padding: 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid gray;
  }
`;
export const ReportesProfesor = () => {
  const idLocalStorage = localStorage.getItem("id");
  const divRef = useRef(null);
  const [data, setData] = useState([]);
  const [estudiante, setEstudiante] = useState(0);
  const [juego, setJuego] = useState("juego1");
  const [datosReporte, setDatosReporte] = useState([]);
  const [datosReporteTotal, setDatosReporteTotal] = useState([]);
  const [nombreEst, setNombreEst] = useState("");
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const nombresPersonalizados = {
    nombre: "Nombre Estudiante",
    correo: "Correo",
    institucion: "Institucion",
    sexo: "Sexo",
  };

  const ConsultaEstudiantesTabla = async () => {
    const datos = await ConsultaEstudiantes(idLocalStorage);
    setData(datos);
  };
  const ConsultaReporteEstTabla = async () => {
    const datos = await ConsultaReporteEstJuego(estudiante, juego);
    setDatosReporte(datos);
  };
  const ConsultaReporteEstTablaTotal = async () => {
    const datos = await ConsultaReporteEstJuegoTotal(estudiante, juego);
    setDatosReporteTotal(datos);
  };
  const ConsultaReporteEstTablaFecha = async () => {
    const datos = await ConsultaReporteEstJuegoFecha(
      estudiante,
      juego,
      fechaInicial,
      fechaFinal
    );
    setDatosReporte(datos);
  };
  const ConsultaReporteEstTablaTotalFecha = async () => {
    const datos = await ConsultaReporteEstJuegoTotalFecha(
      estudiante,
      juego,
      fechaInicial,
      fechaFinal
    );
    setDatosReporteTotal(datos);
  };

  const handleSaveAsPDF = () => {
    console.log(divRef.current);
    const content = divRef.current;

    if (!content) {
      return;
    }

    const options = {
      margin: 10,
      filename: "mi_archivo.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(content, options);
  };

  useEffect(() => {
    ConsultaEstudiantesTabla();
  }, []);

  const ObtenerEstudiante = (valor) => {
    setEstudiante(valor.idestudiantes);
    setNombreEst(valor.nombre);
  };

  function transformarFecha(fecha) {
    const partes = fecha.split("-");
    if (partes.length !== 3) {
      return "";
    }

    const [anio, mes, dia] = partes;
    const fechaTransformada = `${dia}/${mes}/${anio}`;
    return fechaTransformada;
  }

  useEffect(() => {
    if (estudiante !== 0) {
      if (fechaInicial !== "" && fechaFinal !== "") {
        ConsultaReporteEstTablaFecha();
        ConsultaReporteEstTablaTotalFecha();
      } else {
        ConsultaReporteEstTabla();
        ConsultaReporteEstTablaTotal();
      }
    }
  }, [estudiante, juego, fechaInicial, fechaFinal]);

  return (
    <ContenedorPrincipal style={{ paddingTop: "15px" }}>
      <h2 style={{color:"white"}}>Reportes Estudiantes</h2>
      <ContenedorSeccionPadre>
        
        <ContenedorSeccion
          style={{ width: "20%", overflowY: "auto", flexDirection: "column" }}
        >
          <TablaJsonReportes
            jsonData={data}
            columnasOcultas={[
              "idestudiantes",
              "correo",
              "contrasena",
              "institucion",
              "sexo",
              "tipodeusuario",
            ]}
            nombresPersonalizados={nombresPersonalizados}
            consultaDatos={ConsultaEstudiantesTabla}
            estudianteConsulta={ObtenerEstudiante}
          />
          <ContenedorDate>
            <label>
              <b>Desde</b>
            </label>
            <input
              type="date"
              name=""
              id=""
              placeholder="Desde"
              onChange={(e) => setFechaInicial(e.target.value)}
            />
            <label>
              <b>Hasta</b>
            </label>

            <input
              type="date"
              name=""
              id=""
              min={fechaInicial}
              onChange={(e) => setFechaFinal(e.target.value)}
            />
          </ContenedorDate>
        </ContenedorSeccion>
        <ContenedorSeccion style={{ width: "80%" }}>
          <ContenedorPestanas ref={divRef}>
            <div className="contenedor1">
              <span>
                Nombre Estudiante: <b>{nombreEst}</b>
                <br></br>Fecha Consulta:{" "}
                {fechaInicial !== "" && fechaFinal !== ""
                  ? `${transformarFecha(fechaInicial)} - ${transformarFecha(
                      fechaFinal
                    )}`
                  : "Todo"}
              </span>
              <BotonDescargar onClick={handleSaveAsPDF}>
                <i className="bi bi-filetype-pdf"></i> Descargar
              </BotonDescargar>
            </div>
            <ContenedorPestanasHeader>
              <Pestanas
                className={`${juego === "juego1" && "active"}`}
                onClick={() => setJuego("juego1")}
              >
                Juego 1
              </Pestanas>
              <Pestanas
                className={`${juego === "juego2" && "active"}`}
                onClick={() => setJuego("juego2")}
              >
                Juego 2
              </Pestanas>
              <Pestanas
                className={`${juego === "juego3" && "active"}`}
                onClick={() => setJuego("juego3")}
              >
                Juego 3
              </Pestanas>
              <Pestanas
                className={`${juego === "juego4" && "active"}`}
                onClick={() => setJuego("juego4")}
              >
                Juego 4
              </Pestanas>
            </ContenedorPestanasHeader>
            <ContenedorPestanasCuerpo ref={divRef}>
              <TablaJsonReportesEstudiantes
                jsonData={datosReporte}
                nombresPersonalizados={{ calificacion: "Número de Estrellas" }}
              />
              <TablaJsonReportesTotal jsonData={datosReporteTotal} />
            </ContenedorPestanasCuerpo>
          </ContenedorPestanas>
        </ContenedorSeccion>
      </ContenedorSeccionPadre>
    </ContenedorPrincipal>
  );
};
