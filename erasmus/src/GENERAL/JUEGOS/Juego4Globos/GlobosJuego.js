import {
  ConsultaConfJuego4,
  ConsultarInfoImagenes,
} from "CONFIG/BACKEND/Consultas/Juegos";
import { BotonJugar } from "STYLED-COMPONENTS/Botones";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ContenedorGlobal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;
`;

const ContenedorBotonJugar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ContenedorJuego = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
`;

const ContenedorCorrecto = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .cardCorrecta {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 90%;
    height: 10vh;
  }
`;

const SubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
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
  height: 20vh;
  transition: all 1s ease;
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
  handleClickImagen,
  botonesClickeados,
  correcto,
}) => {
  return (
    <ContenedorGrid>
      <React.Fragment>
        <SubGrid style={{ gridColumn: "2 / span 1" }}>
          {/* Contenido columna 2 */}
          {s2.map((imagen, subRowIndex) => {
            const uniqueKey = `${imagen.idimagenes}_2-${subRowIndex + 1}`;
            const verif = botonesClickeados.includes(uniqueKey);
            const validCorrecto = imagen.idimagenes === correcto.idimagenes;

            return (
              <GridItemStyled
                onClick={() => handleClickImagen(uniqueKey, imagen)}
                className={
                  verif ? (validCorrecto ? "clickedt" : "clickedf") : ""
                }
                disabled={verif}
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
                    <p>{imagen.nombreimagen}</p>
                  </>
                )}
              </GridItemStyled>
            );
          })}
        </SubGrid>
        <ContenedorCorrecto style={{ gridColumn: "3 / span 1" }}>
          <div className="cardCorrecta">
            <img
              style={{ objectFit: "contain", width: "50px" }}
              src={correcto.rutaimagen}
              alt={correcto.nombreimagen}
            />
            <p>{correcto.nombreimagen}</p>
          </div>
        </ContenedorCorrecto>
        <SubGrid style={{ gridColumn: "4 / span 1" }}>
          {/* Contenido columna 4 */}
          {s4.map((imagen, subRowIndex) => {
            const uniqueKey = `${imagen.idimagenes}_4-${subRowIndex + 1}`;
            const verif = botonesClickeados.includes(uniqueKey);
            const validCorrecto = imagen.idimagenes === correcto.idimagenes;
            return (
              <GridItemStyled
                onClick={() => handleClickImagen(uniqueKey, imagen)}
                className={
                  verif ? (validCorrecto ? "clickedt" : "clickedf") : ""
                }
                disabled={verif}
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
                    <p>{imagen.nombreimagen}</p>
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
  const [jugando, setJugando] = useState(0);
  const [velocidad, setVelocidad] = useState(1);
  const [correcto, setCorrecto] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [numfilas, setNumFilas] = useState(3);
  const [botonesClickeados, setBotonesClickeados] = useState([]);
  const [shuffledImagesColumn2, setShuffledImagesColumn2] = useState([]);
  const [shuffledImagesColumn4, setShuffledImagesColumn4] = useState([]);
  const [botonesAcertados, setBotonesAcertados] = useState(0);
  const [botonesErroneos, setBotonesErroneos] = useState(0);
  const [cuentaRegresiva, setCuentaRegresiva]=useState(3)

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
      console.log(uniqueKey);
      console.log(botonesClickeados);
      setBotonesAcertados(botonesAcertados + 1);
      console.log(botonesAcertados);
      // alert("correcto");
      // setBotonesClickeadosCorrectos((prevBotones) => [...prevBotones, uniqueKey]);
    } else {
      console.log(uniqueKey);
      setBotonesErroneos(botonesErroneos + 1);
      console.log(botonesErroneos);

      // setBotonesClickeadosErroneos((prevBotones) => [...prevBotones, uniqueKey]);
    }
  };
  const generarShuffleColumns = (numFilas, imgs) => {
    console.log(generarArregloAleatorio(numFilas, imgs));
    setShuffledImagesColumn2(generarArregloAleatorio(numFilas, imgs));
    setShuffledImagesColumn4(generarArregloAleatorio(numFilas, imgs));
  };

  useEffect(() => {
    ConsultarRondas();
  }, []);

  return (
    <ContenedorGlobal>
      {jugando === 0 ? (
        <ContenedorBotonJugar>
          <BotonJugar texto={"JUGAR"} handleClick={() => setJugando(1)} />
        </ContenedorBotonJugar>
      ) : (
        <ContenedorJuego>
          <MyGrid
            numRows={numfilas}
            s2={shuffledImagesColumn2}
            s4={shuffledImagesColumn4}
            shuffledAction={shuffleArray}
            imagenes={imagenes}
            correcto={correcto}
            handleClickImagen={handleClickImagen}
            botonesClickeados={botonesClickeados}
          />
        </ContenedorJuego>
      )}
    </ContenedorGlobal>
  );
};
