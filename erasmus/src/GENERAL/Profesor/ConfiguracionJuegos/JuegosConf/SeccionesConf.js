import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ActualizarConfiguracion2,
  ActualizarConfiguracion3,
  ActualizarConfiguracion4,
  ConsultaConfiguracionJuego1,
  ConsultaConfiguracionJuego2,
  ConsultaConfiguracionJuego3,
  ConsultaConfiguracionJuego4,
  ConsultaImagenesJuego1,
  ConsultaImagenesJuego2,
  ConsultaImagenesJuego3,
  ConsultaImagenesJuego4,
} from "CONFIG/BACKEND/Consultas/Juegos";
import { ActualizarConfiguracion1 } from "CONFIG/BACKEND/Consultas/Juegos";

const puntajejuego1 = [
  {
    value: 5,
    texto: "5 rondas / 1 estrella",
  },
  {
    value: 10,
    texto: "10 rondas / 2 estrellas",
  },
  {
    value: 15,
    texto: "15 rondas / 3 estrellas",
  },
];
const puntajejuego2 = [
  {
    value: 3,
    texto: "3 imagenes / 1 estrella",
  },
  {
    value: 4,
    texto: "4 imagenes / 2 estrellas",
  },
  {
    value: 5,
    texto: "5 imagenes / 3 estrellas",
  },
];

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.5s ease;
  transition: width 3s ease;
  animation: anim 0.5s ease;

  @keyframes anim {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const SelectStyled = styled.select`
  border-radius: 8px;
  padding: 5px 8px;
`;
const BotonStyled = styled.button`
  padding: 8px 15px;
  color: white;
  background-color: var(--color-boton);
  border: none;
  border-radius: 15px;
`;

export const SeccionesConf1 = () => {
  const [mensaje, setMensaje] = useState("");
  const [numRondas, setNumRondas] = useState(0);
  const [imagenes, setImagenes] = useState([]);
  const [valorImagenes, setValorImagenes] = useState([
    { id: 1, imgid: 0 },
    { id: 2, imgid: 0 },
    { id: 3, imgid: 0 },
    { id: 4, imgid: 0 },
  ]);

  const actualizarValorImgId = (id, nuevoValor) => {
    const nuevoEstado = [...valorImagenes];

    const objetoActualizado = nuevoEstado.find((item) => item.id === id);
    if (objetoActualizado) {
      objetoActualizado.imgid = nuevoValor;
    }
    setValorImagenes(nuevoEstado);
  };

  const valueImgs = (id) => {
    const res = valorImagenes.find((item) => item.id === id);
    const re = res.imgid;
    return re;
  };

  const ConsultarImagenesyConfiguraciones = async () => {
    const resp = await ConsultaImagenesJuego1();
    const resp1 = await ConsultaConfiguracionJuego1(localStorage.getItem("id"));
    if (resp.length > 0) {
      setImagenes(resp);
      if (resp1.length > 0) {
        setNumRondas(resp1[0].numRondas);
        actualizarValorImgId(1, resp1[0].img1 === null ? 0 : resp1[0].img1);
        actualizarValorImgId(2, resp1[0].img2 === null ? 0 : resp1[0].img2);
        actualizarValorImgId(3, resp1[0].img3 === null ? 0 : resp1[0].img3);
        actualizarValorImgId(4, resp1[0].img4 === null ? 0 : resp1[0].img4);
      }
    }
  };
  useEffect(() => {
    ConsultarImagenesyConfiguraciones();
  }, []);

  const SelectOptions1Juego1 = (data, label, queimg) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <label>{label}</label>
        <SelectStyled
          id=""
          value={valueImgs(queimg)}
          onChange={(e) =>
            actualizarValorImgId(queimg, parseInt(e.target.value))
          }
        >
          <option value="0">Seleccionar</option>
          {data.map((item, index) => (
            <option key={index} value={item.idimagenes}>
              {item.nombreimagen}
            </option>
          ))}
        </SelectStyled>
      </Contenedor>
    );
  };

  const SelectOptions2Juego1 = (data, label) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <label>{label}</label>
        <SelectStyled
          id=""
          value={numRondas}
          onChange={(e) => setNumRondas(e.target.value)}
        >
          {data.map((item, index) => (
            <option key={index} value={item.value}>
              {item.texto}
            </option>
          ))}
        </SelectStyled>
      </Contenedor>
    );
  };

  const GuardarConfiguracionJuego1 = async (valorP, fetch) => {
    const idp = localStorage.getItem("id");
    const res = await ActualizarConfiguracion1(
      valueImgs(1),
      valueImgs(2),
      valueImgs(3),
      valueImgs(4),
      valorP,
      idp,
      fetch
    );
    res.message === "Actualizada Correcta del Juego"
      ? setMensaje("¡Actualización Correcta!")
      : setMensaje("¡Ha ocurrido un error!");
    setTimeout(() => {
      setMensaje("");
    }, 3000);
    console.log(res);
  };

  return (
    <Contenedor style={{ flexDirection: "column", rowGap: "15px" }}>
      <h5>Configuración juego 1</h5>
      <h6>Selecciona que imágenes desea mostrar</h6>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
      >
        {SelectOptions1Juego1(imagenes, "Arriba", 1)}
        {SelectOptions1Juego1(imagenes, "Derecha", 2)}
        {SelectOptions1Juego1(imagenes, "Abajo", 3)}
        {SelectOptions1Juego1(imagenes, "Izquierda", 4)}
      </Contenedor>
      <h6>Selecciona las rondas</h6>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", justifyContent: "center" }}
      >
        {SelectOptions2Juego1(puntajejuego1, "Puntaje/Estrellas")}
      </Contenedor>
      <Contenedor
        style={{
          paddingTop: "15px",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <BotonStyled
          onClick={() =>
            GuardarConfiguracionJuego1(
              numRondas,
              ConsultarImagenesyConfiguraciones
            )
          }
        >
          Guardar Configuración
        </BotonStyled>
        {mensaje === "¡Actualización Correcta!" && (
          <label style={{ color: "green" }}>{mensaje}</label>
        )}
        {mensaje === "¡Ha ocurrido un error!" && (
          <label style={{ color: "red" }}>{mensaje}</label>
        )}
      </Contenedor>
    </Contenedor>
  );
};
export const SeccionesConf2 = () => {
  const [mensaje, setMensaje] = useState("");
  const [numCartas, setNumCartas] = useState(0);
  const [imagenes, setImagenes] = useState([]);
  const [valorImagenes, setValorImagenes] = useState([
    { id: 1, imgid: 0 },
    { id: 2, imgid: 0 },
    { id: 3, imgid: 0 },
    { id: 4, imgid: 0 },
    { id: 5, imgid: 0 },
    { id: 6, imgid: 0 },
    { id: 7, imgid: 0 },
    { id: 8, imgid: 0 },
    { id: 9, imgid: 0 },
  ]);

  const actualizarValorImgId = (id, nuevoValor) => {
    const nuevoEstado = [...valorImagenes];

    const objetoActualizado = nuevoEstado.find((item) => item.id === id);
    if (objetoActualizado) {
      objetoActualizado.imgid = nuevoValor;
    }
    setValorImagenes(nuevoEstado);
  };

  const valueImgs = (id) => {
    const res = valorImagenes.find((item) => item.id === id);
    const re = res.imgid;
    return re;
  };

  const ConsultarImagenesyConfiguraciones = async () => {
    const resp = await ConsultaImagenesJuego2();
    const resp1 = await ConsultaConfiguracionJuego2(localStorage.getItem("id"));
    if (resp.length > 0) {
      setImagenes(resp);
      if (resp1.length > 0) {
        setNumCartas(resp1[0].numCartas);
        actualizarValorImgId(1, resp1[0].img1 === null ? 0 : resp1[0].img1);
        actualizarValorImgId(2, resp1[0].img2 === null ? 0 : resp1[0].img2);
        actualizarValorImgId(3, resp1[0].img3 === null ? 0 : resp1[0].img3);
        actualizarValorImgId(4, resp1[0].img4 === null ? 0 : resp1[0].img4);
        actualizarValorImgId(5, resp1[0].img5 === null ? 0 : resp1[0].img5);
        actualizarValorImgId(6, resp1[0].img6 === null ? 0 : resp1[0].img6);
        actualizarValorImgId(7, resp1[0].img7 === null ? 0 : resp1[0].img7);
        actualizarValorImgId(8, resp1[0].img8 === null ? 0 : resp1[0].img8);
        actualizarValorImgId(9, resp1[0].img9 === null ? 0 : resp1[0].img9);
      }
    }
  };
  useEffect(() => {
    ConsultarImagenesyConfiguraciones();
  }, []);

  const SelectOptions1Juego2 = (data, label, queimg) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <label>{label}</label>
        <SelectStyled
          id=""
          value={valueImgs(queimg)}
          onChange={(e) =>
            actualizarValorImgId(queimg, parseInt(e.target.value))
          }
        >
          <option value="0">Seleccionar</option>
          {data.map((item, index) => (
            <option key={index} value={item.idimagenes}>
              {item.nombreimagen}
            </option>
          ))}
        </SelectStyled>
      </Contenedor>
    );
  };

  const SelectOptions2Juego2 = (data, label) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <label>{label}</label>
        <SelectStyled
          id=""
          value={numCartas}
          onChange={(e) => setNumCartas(e.target.value)}
        >
          {data.map((item, index) => (
            <option key={index} value={item.value}>
              {item.texto}
            </option>
          ))}
        </SelectStyled>
      </Contenedor>
    );
  };

  const GuardarConfiguracionJuego2 = async (valorC, fetch) => {
    const idp = localStorage.getItem("id");
    const res = await ActualizarConfiguracion2(
      valueImgs(1),
      valueImgs(2),
      valueImgs(3),
      valueImgs(4),
      valueImgs(5),
      valueImgs(6),
      valueImgs(7),
      valueImgs(8),
      valueImgs(9),
      valorC,
      idp,
      fetch
    );
    res.message === "Actualizada Correcta del Juego"
      ? setMensaje("¡Actualización Correcta!")
      : setMensaje("¡Ha ocurrido un error!");
    setTimeout(() => {
      setMensaje("");
    }, 3000);
    console.log(res);
  };

  return (
    <Contenedor style={{ flexDirection: "column", rowGap: "15px" }}>
      <h5>Configuración juego 2</h5>
      <h6>Selecciona que imágenes desea mostrar</h6>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
      >
        {SelectOptions1Juego2(imagenes, "1", 1)}
        {SelectOptions1Juego2(imagenes, "2", 2)}
        {SelectOptions1Juego2(imagenes, "3", 3)}
      </Contenedor>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
      >
        {SelectOptions1Juego2(imagenes, "4", 4)}
        {SelectOptions1Juego2(imagenes, "5", 5)}
        {SelectOptions1Juego2(imagenes, "6", 6)}
      </Contenedor>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
      >
        {SelectOptions1Juego2(imagenes, "7", 7)}
        {SelectOptions1Juego2(imagenes, "8", 8)}
        {SelectOptions1Juego2(imagenes, "9", 9)}
      </Contenedor>
      <h6>Selecciona número de cartas a memorizar</h6>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", justifyContent: "center" }}
      >
        {SelectOptions2Juego2(puntajejuego2, "Puntaje/Estrellas")}
      </Contenedor>
      <Contenedor
        style={{
          paddingTop: "15px",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <BotonStyled
          onClick={() =>
            GuardarConfiguracionJuego2(
              numCartas,
              ConsultarImagenesyConfiguraciones
            )
          }
        >
          Guardar Configuración
        </BotonStyled>
        {mensaje === "¡Actualización Correcta!" && (
          <label style={{ color: "green" }}>{mensaje}</label>
        )}
        {mensaje === "¡Ha ocurrido un error!" && (
          <label style={{ color: "red" }}>{mensaje}</label>
        )}
      </Contenedor>
    </Contenedor>
  );
};
export const SeccionesConf3 = () => {
  const [mensaje, setMensaje] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [valorImagenes, setValorImagenes] = useState([{ id: 1, imgid: 0 }]);
  const [orden, setOrden] = useState("");

  const actualizarValorImgId = (id, nuevoValor) => {
    const nuevoEstado = [...valorImagenes];

    const objetoActualizado = nuevoEstado.find((item) => item.id === id);

    if (objetoActualizado) {
      objetoActualizado.imgid = nuevoValor;
    }

    setValorImagenes(nuevoEstado);
  };

  const valueImgs = (id) => {
    const res = valorImagenes.find((item) => item.id === id);
    const re = res.imgid === null ? "0" : res.imgid;
    return re;
  };

  const ConsultarImagenesyConfiguraciones = async () => {
    const resp = await ConsultaImagenesJuego3();
    const resp1 = await ConsultaConfiguracionJuego3(localStorage.getItem("id"));
    if (resp.length > 0) {
      setImagenes(resp);
      if (resp1.length > 0) {
        const ord = resp1[0].ordenJuego;
        setOrden(ord);
        actualizarValorImgId(1, resp1[0].img1 === null ? "0" : resp1[0].img1);
      }
    }
  };
  useEffect(() => {
    ConsultarImagenesyConfiguraciones();
  }, []);

  const SelectOptions1Juego3 = (data, label, queimg) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <label>{label}</label>
        <SelectStyled
          id=""
          value={valueImgs(queimg)}
          onChange={(e) =>
            actualizarValorImgId(
              queimg,
              e.target.value === "0" ? null : parseInt(e.target.value)
            )
          }
        >
          <option value="0">Lienzo en Blanco</option>
          {data.map((item, index) => (
            <option key={index} value={item.idimagenes}>
              {item.nombreimagen}
            </option>
          ))}
        </SelectStyled>
      </Contenedor>
    );
  };

  const GuardarConfiguracionJuego3 = async (fetch) => {
    const idp = localStorage.getItem("id");
    const val = valueImgs(1);
    const res = await ActualizarConfiguracion3(
      val === "0" ? null : val,
      idp,
      orden === "" ? null : orden,
      fetch
    );
    res.message === "Actualizada Correcta del Juego"
      ? setMensaje("¡Actualización Correcta!")
      : setMensaje("¡Ha ocurrido un error!");
    setTimeout(() => {
      setMensaje("");
    }, 3000);
    console.log(res);
  };

  return (
    <Contenedor style={{ flexDirection: "column", rowGap: "15px" }}>
      <h5>Configuración juego 3</h5>
      <h6>Introduzca la orden a mostrar al estudiante (séa breve)</h6>
      <Contenedor>
        <input
          style={{
            borderRadius: "10px",
            padding: "2px 10px",
            border: "solid 1px black",
            width:"100%",
          }}
          type="text"
          name="orden"
          id="orden"
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        />
      </Contenedor>
      <h6>Selecciona la imágen a mostrar</h6>
      <Contenedor style={{ flexDirection: "row", gap: "10px" }}>
        {SelectOptions1Juego3(imagenes, "Imagen a dibujar", 1)}
      </Contenedor>
      <h6>En este juego no se lleva puntaje, es para tareas y dibujo libre</h6>
      <Contenedor
        style={{
          paddingTop: "15px",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <BotonStyled
          onClick={() =>
            GuardarConfiguracionJuego3(ConsultarImagenesyConfiguraciones)
          }
        >
          Guardar Configuración
        </BotonStyled>
        {mensaje === "¡Actualización Correcta!" && (
          <label style={{ color: "green" }}>{mensaje}</label>
        )}
        {mensaje === "¡Ha ocurrido un error!" && (
          <label style={{ color: "red" }}>{mensaje}</label>
        )}
      </Contenedor>
    </Contenedor>
  );
};

export const SeccionesConf4 = () => {
  const [mensaje, setMensaje] = useState("");
  const [idcorrecto, setIdCorrecto] = useState(1);
  const [velocidad, setVelocidad] = useState(1);
  const [imagenes, setImagenes] = useState([]);
  const [filas, setFilas] = useState(3);
  const [valorImagenes, setValorImagenes] = useState([
    { id: 1, imgid: 0 },
    { id: 2, imgid: 0 },
    { id: 3, imgid: 0 },
  ]);

  const actualizarValorImgId = (id, nuevoValor) => {
    const nuevoEstado = [...valorImagenes];

    const objetoActualizado = nuevoEstado.find((item) => item.id === id);
    if (objetoActualizado) {
      objetoActualizado.imgid = nuevoValor;
    }
    setValorImagenes(nuevoEstado);
  };

  const valueImgs = (id) => {
    const res = valorImagenes.find((item) => item.id === id);
    const re = res.imgid;
    return re;
  };

  const ConsultarImagenesyConfiguraciones = async () => {
    const resp = await ConsultaImagenesJuego4();
    const resp1 = await ConsultaConfiguracionJuego4(localStorage.getItem("id"));
    if (resp.length > 0) {
      setImagenes(resp);
      if (resp1.length > 0) {
        setIdCorrecto(resp1[0].idcorrecto);
        setVelocidad(resp1[0].velocidad);
        setFilas(resp1[0].numFilas);
        actualizarValorImgId(1, resp1[0].img1 === null ? 0 : resp1[0].img1);
        actualizarValorImgId(2, resp1[0].img2 === null ? 0 : resp1[0].img2);
        actualizarValorImgId(3, resp1[0].img3 === null ? 0 : resp1[0].img3);
      }
    }
  };
  useEffect(() => {
    ConsultarImagenesyConfiguraciones();
  }, []);

  const SelectOptions1Juego4 = (data, label, queimg) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <label>{label}</label>
        <SelectStyled
          id=""
          value={valueImgs(queimg)}
          onChange={(e) =>
            actualizarValorImgId(queimg, parseInt(e.target.value))
          }
        >
          <option value="0">Seleccionar</option>
          {data.map((item, index) => (
            <option key={index} value={item.idimagenes}>
              {item.nombreimagen}
            </option>
          ))}
        </SelectStyled>
      </Contenedor>
    );
  };
  const SelectOptions2Juego4 = (label) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <label>{label}</label>
        <SelectStyled
          id=""
          value={filas}
          onChange={(e) => setFilas(e.target.value)}
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          
        </SelectStyled>
      </Contenedor>
    );
  };
  const SelectOptions3Juego4 = (vel) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <input
          type="range"
          min={1}
          max={3}
          value={vel}
          onChange={(e) => setVelocidad(e.target.value)}
        />{" "}
        <label>{vel}</label>
      </Contenedor>
    );
  };

  const SelectOptions4Juego4 = (data, label) => {
    return (
      <Contenedor style={{ gap: "5px", alignItems: "center" }}>
        <label>{label}</label>
        <SelectStyled
          id=""
          value={idcorrecto === null ? 0 : idcorrecto}
          onChange={(e) => setIdCorrecto(e.target.value)}
        >
          <option value="0">Seleccionar</option>
          {data.map((item, index) => (
            <option key={index} value={item.idimagenes}>
              {item.nombreimagen}
            </option>
          ))}
        </SelectStyled>
      </Contenedor>
    );
  };

  const GuardarConfiguracionJuego4 = async (vel, idc, numfilas, fetch) => {
    const idp = localStorage.getItem("id");
    const res = await ActualizarConfiguracion4(
      valueImgs(1),
      valueImgs(2),
      valueImgs(3),
      numfilas,
      vel,
      idc,
      idp,
      fetch
    );
    res.message === "Actualizada Correcta del Juego"
      ? setMensaje("¡Actualización Correcta!")
      : setMensaje("¡Ha ocurrido un error!");
    setTimeout(() => {
      setMensaje("");
    }, 3000);
    console.log(res);
  };

  return (
    <Contenedor style={{ flexDirection: "column", rowGap: "15px" }}>
      <h5>Configuración juego 4</h5>
      <h6>Selecciona que imágenes desea mostrar</h6>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
      >
        {SelectOptions1Juego4(imagenes, "1", 1)}
        {SelectOptions1Juego4(imagenes, "2", 2)}
        {SelectOptions1Juego4(imagenes, "3", 3)}
      </Contenedor>
      <h6>Selecciona el número de filas</h6>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
      >
        {SelectOptions2Juego4("Num Filas")}
      </Contenedor>
      <h6>Selecciona la velocidad</h6>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
      >
        {SelectOptions3Juego4(velocidad)}
      </Contenedor>
      <h6>Selecciona el color correcto</h6>
      <Contenedor
        style={{ flexDirection: "row", gap: "10px", justifyContent: "center" }}
      >
        {SelectOptions4Juego4(imagenes, "Color Correcto")}
      </Contenedor>
      <Contenedor
        style={{
          paddingTop: "15px",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <BotonStyled
          onClick={() =>
            GuardarConfiguracionJuego4(
              velocidad,
              idcorrecto,
              filas,
              ConsultarImagenesyConfiguraciones
            )
          }
        >
          Guardar Configuración
        </BotonStyled>
        {mensaje === "¡Actualización Correcta!" && (
          <label style={{ color: "green" }}>{mensaje}</label>
        )}
        {mensaje === "¡Ha ocurrido un error!" && (
          <label style={{ color: "red" }}>{mensaje}</label>
        )}
      </Contenedor>
    </Contenedor>
  );
};
