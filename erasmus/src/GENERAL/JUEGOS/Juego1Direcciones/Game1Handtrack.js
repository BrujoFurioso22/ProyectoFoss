import React, { useState, useEffect, useRef, useCallback } from "react";
import { Botones } from "./Componentes/Botones";
import { Puntaje } from "./Componentes/Puntaje";
import {
  ConsultaRondasJuego1,
  ConsultarInfoImagenes,
  guardarPuntaje,
} from "CONFIG/BACKEND/Consultas/Juegos";
import { BotonJugar } from "STYLED-COMPONENTS/Botones";
import star from "SOURCES/star.svg";
import neutral from "SOURCES/neutral.svg";
import { Loader } from "STYLED-COMPONENTS/Loader/loader";

import styled from "styled-components";

import "./assets/styles/boton_iniciar.css";
import "./assets/styles/checkbox.css"

import openI from "SOURCES/openhand.svg";
import closeI from "SOURCES/closehand.svg";

import * as handTrack from "handtrackjs";


const numJuego = "juego1"; //no tocar esto

const defaultParams = {
  flipHorizontal: true,
  outputStride: 16,
  imageScaleFactor: 0.5,
  maxNumBoxes: 20,
  iouThreshold: 0.8,
  scoreThreshold: 0.6,
  modelType: "ssd320fpnlite",
  modelSize: "medium",
  bboxLineWidth: "1",
  fontSize: 17,
};

const ContenedorGlobal = styled.div`
  width: 100%;
  height: calc(100%);
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const ContenedorBotones = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  width: 100%;
  height: 85vh;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mensaje-central {
    grid-column: 2;
    grid-row: 2;
  }
  .boton-arriba {
    grid-column: 2;
    grid-row: 1;
  }
  .boton-izquierda {
    grid-column: 1;
    grid-row: 2;
  }
  .boton-derecha {
    grid-column: 3;
    grid-row: 2;
  }
  .boton-abajo {
    grid-column: 2;
    grid-row: 3;
  }
  .cambiarModo {
    grid-column: 3;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    .tituloH{
      background-color: var(--color-p);
      color: white;
      padding: 2px 8px;
      border-radius:10px ;
    }
  }
`;
const PuntajeStyled = styled.div`
  grid-column: 1;
  grid-row: 1;
  span:first-child {
    font-weight: 700;
    padding-right: 10px;
    background-color: white;
    text-align: center;
    padding: 3px 10px;
    border-radius: 8px;
  }
`;

const ContenedorCentral = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-direction: column;
  .iniciado {
    gap: 10px;
  }
`;

const ContenedorStars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  gap: 15px;
  animation: entrance 1.3s ease;

  img {
    width: 80px;
    object-fit: contain;
  }

  @keyframes entrance {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    70% {
      opacity: 0.8;
      transform: scale(1.15);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ContenedorVideo = styled.div`
  position: absolute;
  width: 100%;
  height: 0%;
  top: 0;
  left: 0;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
  }
`;

const ObjetoMover = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: blueviolet;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.51);
`;

export function Game1Handtrack() {
  const [numRondas, setNumRondas] = useState(5);
  const [accion, setaccion] = useState(""); //Es el estado que se mostrara en el medio del juego para que el jugador sepa que tiene que tocar
  const [contador, setcontador] = useState(0); //Contador para mostrar al jugador al iniciar el juego, 3->2->1
  const [iniciarJuego, setIniciarJuego] = useState(false); //Estado para decir que el juego se empezo
  const [AccionInicioJuego, setAccionInicioJuego] = useState(false); //Estado para hacer que la logica del juego inicie
  const [hajugado, setHaJugado] = useState(false); //Estado para indicar si el jugador ya jugo una vez, true es que ya jugo, false es que es la primera vez
  const [puntaje, setPuntaje] = useState(0); // Estado para el puntaje
  const [arregloAleatorio, setArregloAleatorio] = useState([]); //Arreglo el cual se generara aleatoriamente
  const [indiceActual, setIndiceActual] = useState(0); //Estado para indicar en que ronda va el juego
  const [habilitar, sethabilitar] = useState(true); // Estado para activar o desactivar los botones
  const [imagenesJuego, setImagenesJuego] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });
  const [mostrarLoader, setMostrarLoader] = useState(false);
  const [handtrackingActivado, setHandtrackingActivado] = useState(false);
  const [handClosed, setHandClosed] = useState(false);
  const [lastClickedButton, setLastClickedButton] = useState(null);
  const [activadoHandT, setActivadoHandT] = useState(false);

  const DecirTexto = (text, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (iniciarJuego === false) {
          setMostrarLoader(true);
        }
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(text);

        // Personalizar la voz
        const voices = synth.getVoices();
        utterThis.voice = voices.find((voice) => voice.lang === "es-ES");

        // Establecer el idioma
        utterThis.lang = "es-ES";
        utterThis.rate = 0.9;

        // Hablar el texto
        synth.speak(utterThis);

        // Manejar el evento onend
        utterThis.onend = () => {
          // console.log("La síntesis de voz ha terminado");
          // Resolver la promesa cuando termine la síntesis de voz
          resolve();
        };

        // Manejar cualquier error
        utterThis.onerror = (error) => {
          // console.error("Error en la síntesis de voz", error);
          // Rechazar la promesa en caso de error
          reject(error);
        };
      }, delay);
    });
  };

  function generarArregloAleatorio() {
    const nuevoArreglo = [];

    const nombresImagenes = [];

    for (const key in imagenesJuego) {
      if (imagenesJuego.hasOwnProperty(key)) {
        nombresImagenes.push(imagenesJuego[key].nombreimagen);
      }
    }
    // console.log(nombresImagenes);

    for (let i = 0; i < numRondas; i++) {
      const indiceAleatorio = Math.floor(
        Math.random() * nombresImagenes.length
      );
      nuevoArreglo.push(nombresImagenes[indiceAleatorio]);
    }
    return nuevoArreglo;
  }
  const buscarRutaImagenPorId = (idimg, jsonArr) => {
    // Buscar el objeto en el arreglo que coincida con el idimg proporcionado
    const imagenEncontrada = jsonArr.find(
      (imagen) => imagen.idimagenes === idimg
    );

    // Si se encuentra la imagen, devolver el objeto de la imagen, de lo contrario, devolver un objeto con la ruta predeterminada
    return imagenEncontrada
      ? imagenEncontrada
      : {
          idimagenes: 0,
          nombreimagen: "vacio",
          rutaimagen:
            "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg",
        };
  };

  const ConsultarRondas = async () => {
    const res = await ConsultaRondasJuego1(localStorage.getItem("id"));
    // console.log(res);
    if (res.length > 0) {
      setNumRondas(res[0].numRondas);
      // console.log(res[0]);
      const resimg = await ConsultarInfoImagenes();

      if (resimg.length > 0) {
        setImagenesJuego((prev) => ({
          ...prev,
          img1: buscarRutaImagenPorId(res[0].img1, resimg),
          img2: buscarRutaImagenPorId(res[0].img2, resimg),
          img3: buscarRutaImagenPorId(res[0].img3, resimg),
          img4: buscarRutaImagenPorId(res[0].img4, resimg),
        }));
      }

    }
  };

  const guardarResultados = async () => {
    const idest = localStorage.getItem("id");
    const fechaActual = obtenerFechaActual();
    let estrellas = 0;
    if (puntaje === numRondas) {
      if (puntaje % 5 === 0) {
        estrellas = puntaje / 5;
      }
    }
    const res = await guardarPuntaje(idest, numJuego, fechaActual, estrellas);
    // console.log(res);
  };

  //Funcion para poder mostrar la siguiente opcion despues de que haya seleccionado un boton el jugador
  const mostrarSiguienteAccion = () => {
    if (indiceActual < arregloAleatorio.length) {
      setaccion(arregloAleatorio[indiceActual]);
      DecirTexto(arregloAleatorio[indiceActual], 800);

      setIndiceActual(indiceActual + 1);
    } else {
      setaccion("Fin del Juego");
      sethabilitar(true);
    }
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Meses van de 0 a 11
    const anio = fecha.getFullYear();

    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
  };

  //Funcion a llamar para poder finalize el juego, aqui se colocan las variables para que el juego se ponga en 0 de nuevo
  const finalizarJuego = () => {
    setaccion("");
    guardarResultados();
    if (!hajugado) {
      setHaJugado(true);
    }
    setIniciarJuego(false);
    setIndiceActual(0);
    setArregloAleatorio([]);
    setAccionInicioJuego(false);
    sethabilitar(true);
  };

  //Funcion a llamar para poder iniciar el juego, se establece en 0 algunas variables para poder empezar
  const IniJuego = () => {
    if (iniciarJuego) {
      setIndiceActual(0);
      setPuntaje(0);
      sethabilitar(false);
      mostrarSiguienteAccion();
    }
  };

  useEffect(() => {
    IniJuego();
  }, [AccionInicioJuego]);

  useEffect(() => {
    if (indiceActual === numRondas) {
      const Finalizar = () => {
        setTimeout(() => {
          finalizarJuego();
        }, 2000);
      };
      Finalizar();
    }
  }, [habilitar]);

  useEffect(() => {
    ConsultarRondas();
  }, []);

  const verificarAccion = (botonPresionado) => {
    // console.log(habilitar);
    if (!habilitar) {
      if (handtrackingActivado) {
        const objetoRect = document
          .getElementById("objetoMover")
          .getBoundingClientRect();
        const botonRect = document
          .getElementById(botonPresionado)
          .getBoundingClientRect();

        if (
          objetoRect.left < botonRect.right &&
          objetoRect.right > botonRect.left &&
          objetoRect.top < botonRect.bottom &&
          objetoRect.bottom > botonRect.top
        ) {
          // El objeto está sobre el botón, realiza la acción
          if (botonPresionado === arregloAleatorio[indiceActual - 1]) {
            setPuntaje(puntaje + 1);
            mostrarSiguienteAccion();
          } else {
            mostrarSiguienteAccion();
          }
        }
      } else {
        if (botonPresionado === arregloAleatorio[indiceActual - 1]) {
          setPuntaje(puntaje + 1);
          mostrarSiguienteAccion();
        } else {
          mostrarSiguienteAccion();
        }
      }

      // if (botonPresionado === arregloAleatorio[indiceActual - 1]) {
      //   setPuntaje(puntaje + 1);
      //   mostrarSiguienteAccion();
      // } else {
      //   mostrarSiguienteAccion();
      // }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (contador >= 1) {
        // console.log(contador);
        setcontador(contador - 1);
        if (contador === 1) {
          setaccion("");
        } else {
          setaccion(contador - 1);
        }
      } else {
        // Cuando el contador llega a 1, detiene el intervalo.
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      // Limpia el intervalo cuando el componente se desmonta.
      clearInterval(interval);
    };
  }, [contador]);

  //Funcion para iniciar el juego
  const handleIniciarJuego = (value) => {
    DecirTexto(
      "selecciona los rectangulos de acuerdo a la indicacion que se escuchara a continuacion",
      500
    )
      .then(() => {
        // Realizar una acción después de que termine de hablar

        setTimeout(() => {
          setMostrarLoader(false);
          setIniciarJuego(value);
          setcontador(4);
          setPuntaje(0);
          setTimeout(() => {
            setAccionInicioJuego(true);
          }, 5000);

          const nuevoArreglo = generarArregloAleatorio();
          setArregloAleatorio(nuevoArreglo);
        }, 1000);
      })
      .catch((error) => {
        // Manejar cualquier error que pueda ocurrir durante la síntesis de voz
        console.error("Error durante la síntesis de voz", error);
      });
  };

  const renderStars = (numRondas) => {
    const stars = [];
    for (let i = 0; i < numRondas / 5; i++) {
      stars.push(<img key={i} src={star} alt="Imagen Estrella" />);
    }

    return <ContenedorStars>{stars}</ContenedorStars>;
  };

  /*-----------------------------------------------------------------------------------------------------*/

  const videoRef = useRef(null);
  const [handPosition, setHandPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const runHandDetection = async () => {
      // console.log(handtrackingActivado);
      if (handtrackingActivado) {
        setActivadoHandT(true);
        const video = videoRef.current;

        if (!video) {
          // console.error("La referencia al video no está disponible.");
          return;
        }
        const contenedor = document.getElementById("contenedorGlobal");
        const contenedorRect = contenedor.getBoundingClientRect();
        const model = await handTrack.load(defaultParams);
        await handTrack.startVideo(video);
        // console.log(model);
        // video.onloadeddata = (event) => {
        const detectHand = async () => {
          const predictions = await model.detect(video);

          predictions.forEach((prediction) => {
            const { label, bbox } = prediction;
            const [x, y] = bbox;

            const xGlobal = (x + 50) * (contenedorRect.width / video.width);
            const yGlobal = (y + 70) * (contenedorRect.height / video.height);

            // if (label === "closed") {
            // console.log("¡Mano cerrada detectada!");
            //   setHandClosed(true);
            //   setHandPosition({ x: xGlobal, y: yGlobal });
            //   setLastClickedButton(null);

            // setIsButtonClicked(true);
            // setTimeout(() => {
            //   setIsButtonClicked(false);
            // }, 4000);
            // } else
            if (label === "open") {
              // console.log("¡Mano abierta detectada!");
              // console.log("X: "+xGlobal+" / Y: "+yGlobal);
              setHandClosed(false);
              setHandPosition({ x: xGlobal, y: yGlobal });
              handleButtonClick(xGlobal, yGlobal);
            }
          });

          requestAnimationFrame(detectHand);
        };
        detectHand();
        // };

        return () => {
          model.dispose();
        };
      } else {
        if (activadoHandT) {
          window.location.reload();
        }
      }
    };
    runHandDetection();
  }, [handtrackingActivado]);

  const handleButtonClick = useCallback(
    (x, y) => {
      const buttons = document.getElementsByClassName("button-click");
      const buttonWidth = buttons[0].offsetWidth;
      const buttonHeight = buttons[0].offsetHeight;

      let clickedButton = null;

      Array.from(buttons).forEach((button) => {
        const rect = button.getBoundingClientRect();
        const buttonX = rect.left + rect.width / 2 - 70;
        const buttonY = rect.top + rect.height / 2 - 70;

        if (
          x >= buttonX - buttonWidth / 2 &&
          x <= buttonX + buttonWidth / 2 &&
          y >= buttonY - buttonHeight / 2 &&
          y <= buttonY + buttonHeight / 2
        ) {
          clickedButton = button;
        }
      });

      if (clickedButton && clickedButton !== lastClickedButton) {
        clickedButton.click();
        setLastClickedButton(clickedButton);
      }
    },
    [lastClickedButton]
  );

  const toggleHandtracking = () => {
    setHandtrackingActivado(!handtrackingActivado);
  };

  return (
    <ContenedorGlobal id="contenedorGlobal">
      <ObjetoMover
        id="objetoMover"
        style={{
          opacity: handtrackingActivado ? "1" : "0",
          top: handPosition.y,
          left: handPosition.x,
        }}
        className={handClosed ? "close" : "open"}
        src={handClosed ? closeI : openI}
      ></ObjetoMover>
      <ContenedorVideo
        style={{ display: !handtrackingActivado ? "none" : "block" }}
      >
        <video ref={videoRef} autoPlay={true}></video>
      </ContenedorVideo>
      <ContenedorBotones>
        <PuntajeStyled>
          {/* <Puntaje  puntaje={puntaje} puntajetotal={numRondas} />
           */}
          <span>Número de rondas: {numRondas}</span>
        </PuntajeStyled>
        <div className="boton-arriba">
          <Botones
            habilitar={habilitar}
            texto={!habilitar ? imagenesJuego.img1 : "?"}
            indicacion={imagenesJuego.img1}
            setaccion={setaccion}
            verificarAccion={verificarAccion}
            imagen={imagenesJuego.img1}
            handtracking={handtrackingActivado}
          />
        </div>
        <div className="boton-izquierda">
          <Botones
            habilitar={habilitar}
            texto={!habilitar ? imagenesJuego.img4 : "?"}
            indicacion={imagenesJuego.img4}
            setaccion={setaccion}
            verificarAccion={verificarAccion}
            imagen={imagenesJuego.img4}
            handtracking={handtrackingActivado}
          />
        </div>
        <div className="cambiarModo">
          <span className="tituloH">Handtracking</span>
          <label className="switch">
            <input
              type="checkbox"
              value={handtrackingActivado}
              onClick={toggleHandtracking}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="mensaje-central">
          {mostrarLoader !== true ? (
            iniciarJuego === true ? (
              <ContenedorCentral>
                {AccionInicioJuego && <span>Ronda: {indiceActual}</span>}
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    textTransform: "uppercase",
                  }}
                >
                  {accion}
                </span>
              </ContenedorCentral>
            ) : iniciarJuego === false && hajugado === true ? (
              <ContenedorCentral>
                <h3
                  style={{
                    backgroundColor: "white",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  {puntaje === numRondas
                    ? "Felicidades has acertado todo"
                    : "Lo siento, intenta de nuevo"}
                </h3>
                {puntaje === numRondas ? (
                  <React.Fragment>{renderStars(numRondas)}</React.Fragment>
                ) : (
                  <ContenedorStars>
                    <img src={neutral} alt="Imagen Neutral" />
                  </ContenedorStars>
                )}

                <BotonJugar
                  handleClick={() => handleIniciarJuego(true)}
                  texto="JUGAR DE NUEVO"
                />
              </ContenedorCentral>
            ) : (
              <BotonJugar
                handleClick={() => handleIniciarJuego(true)}
                texto="JUGAR"
              />
            )
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </div>
        <div className="boton-derecha">
          <Botones
            habilitar={habilitar}
            texto={!habilitar ? imagenesJuego.img2 : "?"}
            indicacion={imagenesJuego.img2}
            setaccion={setaccion}
            verificarAccion={verificarAccion}
            imagen={imagenesJuego.img2}
            handtracking={handtrackingActivado}
          />
        </div>
        <div className="boton-abajo">
          <Botones
            habilitar={habilitar}
            texto={!habilitar ? imagenesJuego.img3 : "?"}
            indicacion={imagenesJuego.img3}
            setaccion={setaccion}
            verificarAccion={verificarAccion}
            imagen={imagenesJuego.img3}
            handtracking={handtrackingActivado}
          />
        </div>
      </ContenedorBotones>
    </ContenedorGlobal>
  );
}
