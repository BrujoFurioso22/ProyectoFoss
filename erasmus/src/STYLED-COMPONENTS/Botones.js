import "./botonJuego.css";
export const BotonJugar = ({
  handleClick,
  texto,
  opacityV,
  mostrarBotonConDis,
}) => {
  return (
    <>
      {mostrarBotonConDis ? (
        <button
          onClick={() => handleClick()}
          className="botonJugar"
          style={{ opacity: opacityV ? "1" : "0" }}
          disabled={!opacityV}
        >
          {texto}
        </button>
      ) : (
        <button onClick={() => handleClick()} className="botonJugar">
          {texto}
        </button>
      )}
    </>
  );
};
