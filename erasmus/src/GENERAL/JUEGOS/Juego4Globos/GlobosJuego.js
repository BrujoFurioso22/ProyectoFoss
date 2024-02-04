import {
  ConsultaConfJuego4,
  ConsultarInfoImagenes,
  guardarPuntaje,
} from "CONFIG/BACKEND/Consultas/Juegos";
import { BotonJugar } from "STYLED-COMPONENTS/Botones";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import heart from "SOURCES/heart.svg";
import star from "SOURCES/star.svg";
import neutral from "SOURCES/neutral.svg";

const numJuego = "juego4"; //no tocar esto

const ContenedorGlobal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 20px 0;
`;

const ContenedorBotonJugar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  transform: translateY(-80px);
`;

const ContenedorJuego = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  animation: aparecerC 2s ease;
  @keyframes aparecerC {
    0% {
      opacity: 0;
      transform: translateY(100vh);
    }
    100% {
      opacity: 1;
      transform: translateY(0vh);
    }
  }
`;

const ContenedorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 3fr 1fr;
  gap: 10px;
  width: 100%;
  height: 100%;
  &.iniciar {
    ${(props) =>
      props.duracion &&
      css`
        animation: iniciarJuego 3s ease-in forwards,
          jugando ${props.duracion || 20}s infinite 4s ease-in-out;
      `}
  }
  @keyframes iniciarJuego {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100vh);
    }
  }
  @keyframes jugando {
    0% {
      transform: translateY(-100vh);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`;
const ContenedorCuentaRegresiva = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  .cuentaRegresiva {
    font-weight: 600;
    font-size: 5rem;
    color: white;
  }
`;

const ContenedorCorrecto = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  .cardCorrecta {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 10px 1.5em;
    height: 15vh;
    border: 2px dashed #ffffff;
    border-radius: 10px;
    color: #000000;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    animation: pulsate-bck 1s ease-in-out infinite both;
  }

  @keyframes pulsate-bck {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 1024px) {
    .cardCorrecta {
      padding: 10px 1px;
    }
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

const SubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2vw;
`;

const GridItemStyled = styled.button`
  border: none;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  background-color: #ffffff;
  height: 15vh;
  /* transition: all 1s ease; */
  transition: transform 0.4s ease, background-color 0.4s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.25);
    color: white;
  }
  &.clickedt {
    transform-style: preserve-3d;
    background-color: #529434;
    animation: 1s aparecer ease;
  }
  &.clickedf {
    transform-style: preserve-3d;
    background-color: #943434;
    animation: 1s aparecer ease;
  }

  @keyframes aparecer {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(180deg);
    }
  }
`;

const MyGrid = ({
  numRows,
  s2,
  s4,
  deshabilitado,
  iniciaJuego,
  velocidad,
  handleClickImagen,
  botonesClickeados,
  cuentaRegresiva,
  correcto,
}) => {
  return (
    <ContenedorGrid
      className={iniciaJuego && "iniciar"}
      duracion={30 - velocidad * 5}
    >
      <React.Fragment>
        <SubGrid style={{ gridColumn: "2 / span 1" }}>
          {/* Contenido columna 2 */}
          {s2.map((imagen, subRowIndex) => {
            const uniqueKey = `${imagen.idimagenes}_2-${subRowIndex + 1}`;
            const verif = botonesClickeados.includes(uniqueKey);
            const validCorrecto = imagen.idimagenes === correcto.idimagenes;
            const dehabilitar = verif || deshabilitado;
            return (
              <GridItemStyled
                onClick={() => handleClickImagen(uniqueKey, imagen)}
                className={
                  verif ? (validCorrecto ? "clickedt" : "clickedf") : ""
                }
                disabled={dehabilitar}
                name={`2-${subRowIndex + 1}`}
                key={`2-${subRowIndex + 1}`}
              >
                {verif ? (
                  <span>
                    <i className="bi bi-emoji-sunglasses-fill"></i>
                  </span>
                ) : (
                  <>
                    <img
                      style={{ objectFit: "contain", width: "50px" }}
                      src={imagen.rutaimagen}
                      alt={imagen.nombreimagen}
                    />
                    <span>{imagen.nombreimagen}</span>
                  </>
                )}
              </GridItemStyled>
            );
          })}
        </SubGrid>
        <ContenedorCuentaRegresiva style={{ gridColumn: "3 / span 1" }}>
          {cuentaRegresiva > 0 && (
            <span className="cuentaRegresiva">{cuentaRegresiva}</span>
          )}
        </ContenedorCuentaRegresiva>

        <SubGrid style={{ gridColumn: "4 / span 1" }}>
          {/* Contenido columna 4 */}
          {s4.map((imagen, subRowIndex) => {
            const uniqueKey = `${imagen.idimagenes}_4-${subRowIndex + 1}`;
            const verif = botonesClickeados.includes(uniqueKey);
            const validCorrecto = imagen.idimagenes === correcto.idimagenes;
            const dehabilitar = verif || deshabilitado;
            return (
              <GridItemStyled
                onClick={() => handleClickImagen(uniqueKey, imagen)}
                className={
                  verif ? (validCorrecto ? "clickedt" : "clickedf") : ""
                }
                disabled={dehabilitar}
                name={`4-${subRowIndex + 1}`}
                key={`4-${subRowIndex + 1}`}
              >
                {verif ? (
                  <span>
                    <i className="bi bi-emoji-sunglasses-fill"></i>
                  </span>
                ) : (
                  <>
                    <img
                      style={{ objectFit: "contain", width: "50px" }}
                      src={imagen.rutaimagen}
                      alt={imagen.nombreimagen}
                    />
                    <span>{imagen.nombreimagen}</span>
                  </>
                )}
              </GridItemStyled>
            );
          })}
        </SubGrid>
      </React.Fragment>
    </ContenedorGrid>
  );
};

export const GlobosJuego = () => {
  const [generando, setGenerando] = useState(0);
  const [velocidad, setVelocidad] = useState(1);
  const [correcto, setCorrecto] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [numfilas, setNumFilas] = useState(3);
  const [botonesClickeados, setBotonesClickeados] = useState([]);
  const [shuffledImagesColumn2, setShuffledImagesColumn2] = useState([]);
  const [shuffledImagesColumn4, setShuffledImagesColumn4] = useState([]);
  const [botonesAcertados, setBotonesAcertados] = useState(0);
  const [botonesErroneos, setBotonesErroneos] = useState(0);
  const [cuentaRegresiva, setCuentaRegresiva] = useState(null);
  const [deshabilitado, setDesabilitado] = useState(true);
  const [iniciaJuego, setIniciaJuego] = useState(false);
  const [totalCorrectos, setTotalCorrectos] = useState(null);
  const [vidas, setVidas] = useState(null);
  const [juegoStatus, setJuegoStatus] = useState(null);

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
          nombreimagen: "vacio",
          rutaimagen:
            "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg",
        };
  };
  function generarArregloAleatorio(numFilas, arregloItems) {
    const resultado = [];

    for (let i = 0; i < numFilas; i++) {
      const indiceOriginal = i % arregloItems.length;
      resultado.push(arregloItems[indiceOriginal]);
    }

    // Mezcla aleatoria de los elementos en el resultado
    for (let i = resultado.length - 1; i > 0; i--) {
      const indiceAleatorio = Math.floor(Math.random() * (i + 1));
      [resultado[i], resultado[indiceAleatorio]] = [
        resultado[indiceAleatorio],
        resultado[i],
      ];
    }

    return resultado;
  }

  const ConsultarRondas = async () => {
    const res = await ConsultaConfJuego4(localStorage.getItem("id"));
    // console.log(res);
    if (res.length > 0) {
      setVelocidad(res[0].velocidad);
      setNumFilas(res[0].numFilas);

      const resimg = await ConsultarInfoImagenes();
      // console.log(resimg);

      if (resimg.length > 0) {
        setCorrecto(buscarRutaImagenPorId(res[0].idcorrecto, resimg));
        const imgs = [
          buscarRutaImagenPorId(res[0].img1, resimg),
          buscarRutaImagenPorId(res[0].img2, resimg),
          buscarRutaImagenPorId(res[0].img3, resimg),
        ];
        setImagenes(imgs);
        generarShuffleColumns(res[0].numFilas * 3, imgs);
      }
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleClickImagen = (uniqueKey, imagen) => {
    setBotonesClickeados((prevBotones) => [...prevBotones, uniqueKey]);
    if (correcto.idimagenes === imagen.idimagenes) {
      // console.log(uniqueKey);
      // console.log(botonesClickeados);
      setBotonesAcertados(botonesAcertados + 1);
      // console.log(botonesAcertados);
      // alert("correcto");
      // setBotonesClickeadosCorrectos((prevBotones) => [...prevBotones, uniqueKey]);
    } else {
      // console.log(uniqueKey);
      setBotonesErroneos(botonesErroneos + 1);
      setVidas(vidas - 1);
      // console.log(botonesErroneos);

      // setBotonesClickeadosErroneos((prevBotones) => [...prevBotones, uniqueKey]);
    }
  };
  const generarShuffleColumns = (numFilas, imgs) => {
    // console.log(generarArregloAleatorio(numFilas, imgs));
    setShuffledImagesColumn2(generarArregloAleatorio(numFilas, imgs));
    setShuffledImagesColumn4(generarArregloAleatorio(numFilas, imgs));
  };

  const renderStars = (vel) => {
    const stars = [];
    for (let i = 0; i < vel; i++) {
      stars.push(<img key={i} src={star} alt="Imagen Estrella" />);
    }

    return <ContenedorStars>{stars}</ContenedorStars>;
  };

  const GeneradorImagenes = ({ cantidad }) => {
    const imagenes = [];
    for (let i = 1; i <= cantidad; i++) {
      imagenes.push(
        <img
          style={{ width: "30px" }}
          key={i}
          src={heart} // Cambia la ruta y el formato de las imágenes según tus necesidades
          alt={`hearth ${i}`}
        />
      );
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "5px",
          paddingBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        {imagenes}
      </div>
    );
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Meses van de 0 a 11
    const anio = fecha.getFullYear();

    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
  };

  const guardarResultados = async (status) => {
    const idest = localStorage.getItem("id");
    const fechaActual = obtenerFechaActual();
    let puntaje = 0;
    if(status){
      puntaje = velocidad;
    }
    const res = await guardarPuntaje(idest, numJuego, fechaActual, puntaje);
    console.log(res);
  };

  const IniciarJuego = () => {
    setGenerando(1);
    setJuegoStatus(null);
  };

  const ReiniciarJuego = () => {
    setGenerando(0);
    setBotonesClickeados([]);
    setBotonesAcertados(0);
    setBotonesErroneos(0);
    setCuentaRegresiva(null);
    setDesabilitado(true);
    setIniciaJuego(false);
    setTotalCorrectos(null);
    setVidas(null);
  };

  useEffect(() => {
    ConsultarRondas();
  }, [generando]);

  useEffect(() => {
    const validar = () => {
      // console.log(botonesAcertados);
      if (botonesErroneos === 3) {
        setJuegoStatus(false);
        guardarResultados(false)
        ReiniciarJuego();
      } else {
        if (botonesAcertados === totalCorrectos) {
          setJuegoStatus(true);
          guardarResultados(true)
          ReiniciarJuego();
        }
      }
    };
    validar();
  }, [botonesAcertados, botonesErroneos, totalCorrectos]);

  useEffect(() => {
    if (generando === 1) {
      DecirTexto("Elije los globos del mismo color al globo que se encuentra en el centro. Tienes 3 intentos",500)
      DecirTexto(`${correcto.nombreimagen} es el correcto`,500)
      // Retardo inicial de 3 segundos
      const initialDelay = setTimeout(() => {
        setCuentaRegresiva(5); // Comienza el conteo
      }, 3000);

      // Limpiar el retardo inicial cuando el componente se desmonte
      return () => clearTimeout(initialDelay);
    }
  }, [generando]);

  useEffect(() => {
    if (generando === 1) {
      if (cuentaRegresiva !== null && cuentaRegresiva >= 0) {
        if (cuentaRegresiva === 0) {
          setDesabilitado(false);
          setIniciaJuego(true);
          const cantidadConId2 = shuffledImagesColumn2.filter(
            (obj) => obj.idimagenes === correcto.idimagenes
          ).length;
          const cantidadConId4 = shuffledImagesColumn4.filter(
            (obj) => obj.idimagenes === correcto.idimagenes
          ).length;
          const cantidadTotal = cantidadConId2 + cantidadConId4;
          setTotalCorrectos(cantidadTotal);
          // console.log("TOTAL: " + cantidadTotal);
          setVidas(3);
        }
        const intervalId = setInterval(() => {
          setCuentaRegresiva((prevCount) => prevCount - 1);
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte o el conteo llegue a 0
        return () => clearInterval(intervalId);
      }
    }
  }, [cuentaRegresiva, generando]);

  return (
    <ContenedorGlobal>
      {generando === 0 ? (
        <ContenedorBotonJugar>
          {juegoStatus !== null && (
            <div>
              <h3
                style={{
                  backgroundColor: "white",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                {juegoStatus
                  ? "Felicidades has acertado todo"
                  : "Lo siento, intenta de nuevo"}
              </h3>
              {juegoStatus ? (
                <React.Fragment>{renderStars(velocidad)}</React.Fragment>
              ) : (
                <ContenedorStars>
                  <img src={neutral} alt="Imagen Neutral" />
                </ContenedorStars>
              )}
            </div>
          )}

          <BotonJugar texto={"JUGAR"} handleClick={() => IniciarJuego()} />
        </ContenedorBotonJugar>
      ) : (
        <ContenedorJuego>
          <ContenedorCorrecto>
            {vidas != null && <GeneradorImagenes cantidad={vidas} />}
            <div className="cardCorrecta">
              <img
                style={{ objectFit: "contain", width: "50px" }}
                src={correcto.rutaimagen}
                alt={correcto.nombreimagen}
              />
              <span>{correcto.nombreimagen}</span>
            </div>
          </ContenedorCorrecto>
          <MyGrid
            numRows={numfilas}
            s2={shuffledImagesColumn2}
            s4={shuffledImagesColumn4}
            shuffledAction={shuffleArray}
            imagenes={imagenes}
            correcto={correcto}
            iniciaJuego={iniciaJuego}
            velocidad={velocidad}
            deshabilitado={deshabilitado}
            cuentaRegresiva={cuentaRegresiva}
            handleClickImagen={handleClickImagen}
            botonesClickeados={botonesClickeados}
          />
        </ContenedorJuego>
      )}
    </ContenedorGlobal>
  );
};
