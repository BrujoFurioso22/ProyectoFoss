import React, { useEffect, useState } from "react";
import ContenedorDestino from "./ContenedorDestino";
import {
  ConsultaCartasJuego2,
  ConsultarInfoImagenes,
  guardarPuntaje,
} from "CONFIG/BACKEND/Consultas/Juegos";
import styled from "styled-components";
import "./boton.css";
import "./botonVerificar.css";
import { BotonJugar } from "STYLED-COMPONENTS/Botones";

import star from "SOURCES/star.svg";
import neutral from "SOURCES/neutral.svg";
import { Loader } from "STYLED-COMPONENTS/Loader/loader";

const numJuego = "juego2";

const ContendorGlobal = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0;
`;

const ContendorContenido = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  .contendor-1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    animation: aparecer 1s ease-in-out;

    @keyframes aparecer {
      0% {
        transform: scale(0) rotate(360deg);
      }
      100% {
        transform: scale(1) rotate(0deg);
      }
    }
  }
  .contendor-2 {
    min-width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
  }
  .cuadro {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #63b4ff;
    border: 4px outset var(--color-blanco);
    border-radius: 10px;
    padding: 10px;
    transition: 0.5s ease all;
    &:hover {
      transform: scale(1.05);
      cursor: pointer;
      border: 4px dashed rgba(0, 0, 0, 0.264);
    }
  }
  .cuadro-imagen {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
`;

// const BotonJugar = styled.button`
//   padding: 10px 25px;
//   outline: none;
//   border: none;
//   border-radius: 7px;
//   transition: all 0.3s ease;
//   cursor: pointer;

//   &:hover {
//     background-color: rgba(137, 43, 226, 0.63);
//     color: aliceblue;
//     box-shadow: -2px 2px 2px 1px rgba(0, 0, 0, 0.2);
//   }
// `;

const ContenedorCuadrosContenedores = styled.div`
  width: 100%;
  gap: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .correcto {
    background-color: rgba(0, 128, 0, 0.438);
  }
  .erroneo {
    background-color: rgba(128, 0, 0, 0.438);
  }
`;
const ContenedorCentrados = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContenedorImagenesArrastradas = styled.div`
  background-color: rgb(185, 185, 185);
  min-width: 200px;
  max-width: 100%;
  width: max-content;
  height: auto;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px dashed rgba(0, 0, 0);
  animation: aparecer 1s ease-in-out;

  @keyframes aparecer {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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

export function Game2() {
  const [imagenesEnContenedor, setImagenesEnContenedor] = useState([]);
  const [ID, setID] = useState(0);
  const [iniciarJuego, setIniciarJuego] = useState(0);
  const [imagenesAleatorias, setImagenesAleatorias] = useState([]);
  const [mostrarImagenes, setMostrarImagenes] = useState(0);
  const [win, setwin] = useState("");
  const [editable, setEditable] = useState(false);
  const [mostrarVerificar, setMostrarVerificar] = useState(true);
  const [mostrarJugar, setMostrarJugar] = useState(true);
  const [haJugado, setHaJugado] = useState(0);

  const [numCartas, setNumCartas] = useState(3);
  const [estrellas, setEstrellas] = useState(-1);
  const [jsonImages, setJsonImages] = useState([]);
  const [mostrarLoader, setMostrarLoader] = useState(false);

  const DecirTexto = (text, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (win === "") {
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
          nombreimagen: "sn",
          rutaimagen:
            "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg",
        };
  };

  const CrearJsonImage = (jsonInfo, ids) => {
    let jsonFiltrado = {};
    for (const key in ids) {
      if (key.startsWith("img")) {
        jsonFiltrado[key] = ids[key];
      }
    }
    let jsonFinal = [];

    for (const key in jsonFiltrado) {
      if (key.startsWith("img")) {
        const id = parseInt(key.replace("img", ""));
        const imagenInfo = buscarRutaImagenPorId(jsonFiltrado[key], jsonInfo);
        jsonFinal.push({
          nombreimagen: key,
          rutaimagen: imagenInfo.rutaimagen,
          idimagenes: id,
        });
      }
    }
    return jsonFinal;
  };

  const ConsultarNumeroCartas = async () => {
    const res = await ConsultaCartasJuego2(localStorage.getItem("id"));
    if (res.length > 0) {
      setNumCartas(res[0].numCartas);
      const resimg = await ConsultarInfoImagenes();
      if (resimg.length > 0) {
        const resp = CrearJsonImage(resimg, res[0]);
        setJsonImages(resp);
      }
    }
  };
  useEffect(() => {
    ConsultarNumeroCartas();
  }, []);

  const handleDragStart = (id) => {
    setID(id);
  };

  const handleDrop = () => {
    const imagenArrastrada = jsonImages.find(
      (imagen) => imagen.idimagenes === ID
    );
    const verificarRep = imagenesEnContenedor.some(
      (img) => img.idimagenes === ID
    );

    if (imagenArrastrada) {
      if (!verificarRep) {
        if (imagenesEnContenedor.length < numCartas) {
          setImagenesEnContenedor([...imagenesEnContenedor, imagenArrastrada]);
        }
      }
    }
    setID(0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const removeImage = (nuevasImagenes) => {
    setImagenesEnContenedor(nuevasImagenes);
  };

  const Resetear = () => {
    setwin("");
    setEditable(false);
    setImagenesEnContenedor([]);
    setMostrarVerificar(true);
    setEstrellas(-1);
  };

  const IniciarJuego = () => {
    setMostrarLoader(true);
    DecirTexto(
      "Observa las imágenes en el cuadro. Luego, coloca las imágenes en el mismo orden en el rectángulo vacío. Puedes arrastrar o seleccionar las imágenes. ¡Buena suerte!",
      500
    )
      .then(() => {
        Resetear();
        // Realizar una acción después de que termine de hablar
        setMostrarLoader(false);
        setIniciarJuego(1);
        obtenerImagenesAleatorias(jsonImages, numCartas);
        setMostrarImagenes(1);
        setMostrarJugar(false);
        setHaJugado(1);

        setTimeout(() => {
          setMostrarImagenes(0);
          setEditable(true);
        }, 6000);
      })
      .catch((error) => {
        // Manejar cualquier error que pueda ocurrir durante la síntesis de voz
        console.error("Error durante la síntesis de voz", error);
      });
  };

  // Función para obtener un arreglo aleatorio sin repeticiones
  const obtenerImagenesAleatorias = (arregloOriginal, cantidad) => {
    const copiaArregloOriginal = [...arregloOriginal];
    const imgAl = [];

    for (let i = 0; i < cantidad && copiaArregloOriginal.length > 0; i++) {
      const indiceAleatorio = Math.floor(
        Math.random() * copiaArregloOriginal.length
      );
      const imagenSeleccionada = copiaArregloOriginal.splice(
        indiceAleatorio,
        1
      )[0];
      imgAl.push(imagenSeleccionada);
    }
    setImagenesAleatorias(imgAl);
  };

  const VerificarJuego = async () => {
    setTimeout(() => {
      const sonIdenticos =
        JSON.stringify(imagenesEnContenedor) ===
        JSON.stringify(imagenesAleatorias);

      setwin(sonIdenticos);
      setMostrarVerificar(false);
      setMostrarJugar(true);
      if (sonIdenticos) {
        setEstrellas(numCartas - 2);
      } else {
        setEstrellas(0);
      }
    }, 1500);
  };

  const handleTouchStart = (id, e) => {
    e.preventDefault();
    setID(id);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    handleDrop();
  };
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Meses van de 0 a 11
    const anio = fecha.getFullYear();

    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
  };

  const renderStars = (numCartas) => {
    const stars = [];
    for (let i = 0; i < numCartas - 2; i++) {
      stars.push(<img key={i} src={star} alt="Imagen Estrella" />);
    }

    return <ContenedorStars>{stars}</ContenedorStars>;
  };

  useEffect(() => {
    if (estrellas !== -1) {
      const guardarResultados = async () => {
        const idest = localStorage.getItem("id");
        const fechaActual = obtenerFechaActual();
        const res = await guardarPuntaje(
          idest,
          numJuego,
          fechaActual,
          estrellas
        );
        console.log(res);
        setEstrellas(-1);
      };
      guardarResultados();
    }
  }, [estrellas]);

  return (
    <ContendorGlobal>
      <ContendorContenido>
        <div
          className="contendor-1"
          style={{ display: win !== "" ? "flex" : "grid" }}
        >
          {win !== "" ? (
            <div style={{ padding: "20px", borderBottom: "1px solid black" }}>
              <h3
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
              >
                {win ? "Felicidades has ganado" : "Lo siento, intenta de nuevo"}
              </h3>
              {win ? (
                <React.Fragment>{renderStars(numCartas)}</React.Fragment>
              ) : (
                <ContenedorStars>
                  <img src={neutral} alt="Imagen Neutral" />
                </ContenedorStars>
              )}
            </div>
          ) : (
            <React.Fragment>
              {jsonImages.map((imagen, index) => (
                <div
                  key={index}
                  className="cuadro"
                  id={imagen.idimagenes}
                  draggable
                  onDragOver={handleDragOver}
                  onDragStart={() => handleDragStart(imagen.idimagenes)}
                  onTouchStart={(e) => handleTouchStart(imagen.idimagenes, e)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    className="cuadro-imagen"
                    src={imagen.rutaimagen}
                    alt={imagen.nombreimagen}
                  />
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
        {mostrarLoader === true ? (
          <div className="contendor-2">
            <Loader />
          </div>
        ) : (
          <div className="contendor-2">
            <ContenedorCentrados style={{ gap: "20px" }}>
              <span
                style={{
                  backgroundColor: "white",
                  padding: "3px 10px",
                  borderRadius: "10px",
                }}
              >
                Numero de cartas
                <br /> a memorizar: {numCartas}
              </span>
              <BotonJugar
                style={{ opacity: mostrarJugar ? "1" : "0" }}
                disabled={!mostrarJugar}
                handleClick={IniciarJuego}
                texto={haJugado === 0 ? "JUGAR" : "JUGAR DE NUEVO"}
              />
              {/* <BotonJugar
                disabled={!mostrarJugar}
                style={{ opacity: mostrarJugar ? "1" : "0" }}
                onClick={IniciarJuego}
                className="btn"
              >
                <span>{haJugado === 0 ? "Jugar" : "Jugar de nuevo"}</span>
              </BotonJugar> */}
            </ContenedorCentrados>
            {iniciarJuego === 1 && (
              <ContenedorCuadrosContenedores>
                {mostrarImagenes === 1 ? (
                  <ContenedorImagenesArrastradas>
                    {imagenesAleatorias.map((imagen, index) => (
                      <DestinoContenedor key={index} id={imagen.idimagenes}>
                        <img
                          className="destino-imagen"
                          src={imagen.rutaimagen}
                          alt={imagen.nombreimagen}
                        />
                      </DestinoContenedor>
                    ))}
                  </ContenedorImagenesArrastradas>
                ) : (
                  <ContenedorDestino
                    imagenesEnContenedor={imagenesEnContenedor}
                    dejar={() => (editable ? handleDrop() : "")}
                    idimg={ID}
                    jsonImages={jsonImages}
                    removeImage={removeImage}
                  />
                )}
                {win !== "" && (
                  <ContenedorImagenesArrastradas
                    className={`${win ? "correcto" : "erroneo"}`}
                  >
                    {imagenesAleatorias.map((imagen, index) => (
                      <DestinoContenedor key={index} id={imagen.idimagenes}>
                        <img
                          className="destino-imagen"
                          src={imagen.rutaimagen}
                          alt={imagen.nombreimagen}
                        />
                      </DestinoContenedor>
                    ))}
                  </ContenedorImagenesArrastradas>
                )}
                {imagenesEnContenedor.length === numCartas &&
                  mostrarVerificar && (
                    <button
                      onClick={() => VerificarJuego()}
                      className="botonVerificar"
                    >
                      Verificar Respuesta
                    </button>
                  )}
              </ContenedorCuadrosContenedores>
            )}
          </div>
        )}
      </ContendorContenido>
    </ContendorGlobal>
  );
}
