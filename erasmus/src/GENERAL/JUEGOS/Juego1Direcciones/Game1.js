import React, { useState, useEffect } from "react";
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

const numJuego = "juego1"; //no tocar esto


const ContenedorGlobal = styled.div`
  width: 100%;
  height: calc(100%);
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
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

export function Game1() {
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


  function generarArregloAleatorio() {
    const nuevoArreglo = [];

    const nombresImagenes = [];

    for (const key in imagenesJuego) {
      if (imagenesJuego.hasOwnProperty(key)) {
        nombresImagenes.push(imagenesJuego[key].nombreimagen);
      }
    }
    console.log(nombresImagenes)

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
          nombreimagen:"vacio",
          rutaimagen:
            "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg",
        };
  };

  const ConsultarRondas = async () => {
    const res = await ConsultaRondasJuego1(localStorage.getItem("id"));
    console.log(res);
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

      // console.log(buscarRutaImagenPorId(res[0].img1, resimg));
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
    console.log(res);
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
    if (!habilitar) {
      if (botonPresionado === arregloAleatorio[indiceActual - 1]) {
        setPuntaje(puntaje + 1);
        mostrarSiguienteAccion();
      } else {
        mostrarSiguienteAccion();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (contador >= 1) {
        console.log(contador);
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

  return (
    <ContenedorGlobal>
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
          />
        </div>
        <div className="cambiarModo"> </div>
        <div className="mensaje-central">
          {mostrarLoader !== true ? (
            iniciarJuego === true ? (
              <ContenedorCentral>
                {AccionInicioJuego && <span>Ronda: {indiceActual}</span>}
                <span style={{ fontWeight: "600", fontSize: "25px", textTransform:"uppercase"}}>
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
          />
        </div>
      </ContenedorBotones>
    </ContenedorGlobal>
  );
}
