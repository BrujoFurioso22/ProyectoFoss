import {
  ConsultarInfoImagenes,
  ConsultaTareaJuego3,
} from "CONFIG/BACKEND/Consultas/Juegos";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
const COLORES = [
  "#000000",
  "#FF0000",
  "#5a5a5a",
  "#0000FF",
  "#FFFF00",
  "#800080",
  "#FFA500",
  "#FFC0CB",
  "#808080",
  "#A52A2A",
  "#00FFFF",
  "#FF00FF",
];

const ContenedorTools = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BotonTools = styled.div`
  border: none;
  border-radius: 8px;
  background-color: var(--color-boton);
  color: white;
  padding: 6px 15px;
  display: flex;
  gap: 10px;
  cursor: pointer;
`;
const ContenedorColores = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const ContenedorOrden = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 14px;
  padding: 3px 15px;
  font-weight: 500;
  color: black;
  width: 95%;
  border-radius: 10px;
  box-shadow: 0px 0 5px 1px rgba(0, 0, 0, 0.76);
  text-align: center;
  z-index: 2;

  i {
    font-size: 20px;
  }
`;

export const CanvasApp = () => {
  const mainCanvasRef = useRef(null);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [eraserMode, setEraserMode] = useState(false);
  const [colorGuard, setColorGuard] = useState("#000000");
  const [imgTarea, setImgTarea] = useState("white");
  const [primeraCarga, setPrimeraCarga] = useState(false);
  const [orden, setOrden] = useState("");

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
          nombreimagen: "sn",
          rutaimagen: "",
        };
  };
  const ConsultarImagen = async () => {
    const res = await ConsultaTareaJuego3(localStorage.getItem("id"));
    if (res.length > 0) {
      // console.log(res[0].ordenJuego);
      const ord = res[0].ordenJuego;
      if (ord != null) {
        setOrden(ord);
        DecirTexto(ord, 500);
      }
      const resimg = await ConsultarInfoImagenes();
      if (resimg.length > 0) {
        const resp = buscarRutaImagenPorId(res[0].img1, resimg);
        // console.log(resp);
        setImgTarea(resp);
      }
    }
  };

  useEffect(() => {
    ConsultarImagen();
  }, []);

  const CargarCanvas = (carga) => {
    const mainCanvas = mainCanvasRef.current;
    const context = mainCanvas.getContext("2d");

    let initialX, initialY;
    let isDrawing = false;

    const setInitialBackground = () => {
      setPrimeraCarga(true);
      if (imgTarea.rutaimagen === "") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
      }
    };

    const preventDefault = (evt) => {
      evt.preventDefault();
    };

    const obtenerCoordenadas = (evt) => {
      const rect = mainCanvas.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;
      return { x, y };
    };

    const dibujar = (cursorX, cursorY) => {
      context.beginPath();
      context.moveTo(initialX, initialY);
      context.lineWidth = brushSize;
      context.strokeStyle = brushColor;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineTo(cursorX, cursorY);
      context.stroke();

      initialX = cursorX;
      initialY = cursorY;
    };

    const iniciarDibujo = (x, y) => {
      initialX = x;
      initialY = y;
      dibujar(initialX, initialY);
      isDrawing = true;
    };

    const detenerDibujo = () => {
      isDrawing = false;
    };

    const mouseDown = (evt) => {
      const { x, y } = obtenerCoordenadas(evt);
      iniciarDibujo(x, y);
    };

    const mouseMoving = (evt) => {
      if (!isDrawing) return;
      const { x, y } = obtenerCoordenadas(evt);
      dibujar(x, y);
    };

    const mouseUp = () => {
      detenerDibujo();
    };

    const touchStart = (evt) => {
      const touch = evt.touches[0];
      const { clientX, clientY } = touch;
      const { x, y } = obtenerCoordenadas({ clientX, clientY });
      iniciarDibujo(x, y);
    };

    const touchMove = (evt) => {
      if (!isDrawing) return;
      const touch = evt.touches[0];
      const { clientX, clientY } = touch;
      const { x, y } = obtenerCoordenadas({ clientX, clientY });
      dibujar(x, y);
    };

    const touchEnd = () => {
      detenerDibujo();
    };

    // Establecer el fondo blanco al inicio
    // console.log(carga);
    if (!carga) {
      setInitialBackground();
    }

    mainCanvas.addEventListener("mousedown", mouseDown);
    mainCanvas.addEventListener("mouseup", mouseUp);
    mainCanvas.addEventListener("mousemove", mouseMoving);

    mainCanvas.addEventListener("touchstart", touchStart);
    mainCanvas.addEventListener("touchmove", touchMove);
    mainCanvas.addEventListener("touchend", touchEnd);
    mainCanvas.addEventListener("touchmove", preventDefault, {
      passive: false,
    });

    return () => {
      // Limpiar event listeners al desmontar el componente
      mainCanvas.removeEventListener("mousedown", mouseDown);
      mainCanvas.removeEventListener("mouseup", mouseUp);
      mainCanvas.removeEventListener("mousemove", mouseMoving);

      mainCanvas.removeEventListener("touchstart", touchStart);
      mainCanvas.removeEventListener("touchmove", touchMove);
      mainCanvas.removeEventListener("touchend", touchEnd);
      mainCanvas.removeEventListener("touchmove", preventDefault);
    };
  };

  useEffect(() => {
    const cargar = CargarCanvas(primeraCarga);
    return cargar;
  }, [brushSize, brushColor, primeraCarga]);

  const BrushColor = (color) => {
    if (eraserMode === false) {
      setBrushColor(color);
      setColorGuard(color);
    }
  };

  const guardarImagen = () => {
    const canvas = mainCanvasRef.current;

    // Guardar la imagen
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "pizarra.png";
    link.click();
  };

  const guardarImagenConTarea = () => {
    const fondoCanvas = document.createElement("canvas");
    fondoCanvas.width = mainCanvasRef.current.width;
    fondoCanvas.height = mainCanvasRef.current.height;
    const fondoContext = fondoCanvas.getContext("2d");

    const fondo = new Image();

    // Reemplaza la URL con la ruta local donde has descargado la imagen
    fondo.src = imgTarea.rutaimagen;

    fondo.onload = () => {
      // Calcular las dimensiones para mantener la relación de aspecto y usar "contain"
      const aspectRatio = fondo.width / fondo.height;
      const canvasAspectRatio = fondoCanvas.width / fondoCanvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (aspectRatio > canvasAspectRatio) {
        drawWidth = fondoCanvas.width;
        drawHeight = fondoCanvas.width / aspectRatio;
        offsetX = 0;
        offsetY = (fondoCanvas.height - drawHeight) / 2;
      } else {
        drawWidth = fondoCanvas.height * aspectRatio;
        drawHeight = fondoCanvas.height;
        offsetX = (fondoCanvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      // Dibujar la imagen de fondo con "contain"
      fondoContext.drawImage(fondo, offsetX, offsetY, drawWidth, drawHeight);

      // Dibujar la imagen original encima del fondo
      fondoContext.drawImage(mainCanvasRef.current, 0, 0);

      // Obtener la URL de la imagen resultante
      const dataURLConFondo = fondoCanvas.toDataURL();

      // Crear un enlace para descargar la imagen resultante
      const link = document.createElement("a");
      link.href = dataURLConFondo;
      link.download = "pizarra_con_fondo.jpg";

      // Simular un clic en el enlace para iniciar la descarga
      link.click();
    };
  };

  const limpiarPizarron = () => {
    const mainCanvas = mainCanvasRef.current;
    const context = mainCanvas.getContext("2d");
    context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    if (imgTarea.rutaimagen === "") {
      context.fillStyle = "#ffffff"; // Puedes ajustar el color al que desees
      context.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
    }
  };
  const toggleBorrador = () => {
    if (eraserMode) {
      setBrushColor(colorGuard);
    } else {
      setBrushColor("#FFFFFF");
    }
    setEraserMode(!eraserMode);
  };

  return (
    <ContenedorTools style={{ flexDirection: "column" }}>
      <ContenedorTools
        style={{
          gap: "30px",
          backgroundColor: "white",
          borderRadius: "0 0 15px 15px",
          padding: "10px 15px",
          flexWrap: "wrap",
        }}
      >
        <ContenedorTools style={{ gap: "10px" }}>
          <label style={{ fontWeight: "600" }}>Tamaño pincel {brushSize}</label>
          <input
            type="range"
            value={brushSize}
            min="1"
            max="30"
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
        </ContenedorTools>
        <ContenedorTools style={{ gap: "10px" }}>
          <label style={{ fontWeight: "600" }}>Color del Pincel: </label>
          <ContenedorColores>
            {COLORES.map((color) => (
              <div
                key={color}
                className={`color-option ${
                  brushColor === color ? "selected" : ""
                }`}
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "3px",
                  cursor: "pointer",
                  border: brushColor === color ? "1px solid #FFD700" : "none",
                  borderRadius: "50%",
                  background: color,
                  boxShadow:
                    brushColor === color
                      ? "0 0 20px 1px rgba(0, 0, 0, 0.38)"
                      : "none",
                }}
                onClick={() => BrushColor(color)}
              ></div>
            ))}
          </ContenedorColores>
        </ContenedorTools>
      </ContenedorTools>

      <ContenedorTools>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            padding: "0px 25px 10px",
            backgroundColor: "white",
            marginBottom: "5px",
            borderRadius: "0 0 15px 15px",
          }}
        >
          <BotonTools
            onClick={() =>
              imgTarea.rutaimagen === ""
                ? guardarImagen()
                : guardarImagenConTarea()
            }
          >
            Guardar Imagen<i className="bi bi-floppy-fill"></i>
          </BotonTools>
          <BotonTools onClick={limpiarPizarron}>
            Limpiar<i className="bi bi-trash-fill"></i>
          </BotonTools>
          <BotonTools onClick={toggleBorrador}>
            {eraserMode ? (
              <>
                Pincel<i className="bi bi-brush"></i>
              </>
            ) : (
              <>
                Borrador<i className="bi bi-eraser-fill"></i>
              </>
            )}
          </BotonTools>
        </div>
      </ContenedorTools>
      <ContenedorTools style={{ flexDirection: "column" }}>
        <ContenedorOrden>
          <span>
            {orden}{" "}
            <i
              style={{ cursor: "pointer" }}
              onClick={() => DecirTexto(orden, 500)}
              className="bi bi-volume-up-fill"
            ></i>
          </span>
        </ContenedorOrden>
        <canvas
          ref={mainCanvasRef}
          width={window.innerWidth <= 1024 ? 800 : 1000}
          height={window.innerHeight <= 768 ? 500 : 600}
          style={{
            border: "1px solid #000",
            background:
              imgTarea.rutaimagen === ""
                ? "white"
                : `url('${imgTarea.rutaimagen}') center/contain no-repeat no-repeat`,
            borderRadius: "25px",
            boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.57)",
          }}
        ></canvas>
      </ContenedorTools>
    </ContenedorTools>
  );
};
