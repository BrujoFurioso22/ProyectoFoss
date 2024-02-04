import "./botonJuego.css";
export const BotonJugar = ({ handleClick, texto }) => {
  return (
    <button onClick={()=> handleClick()} className="botonJugar">
      {texto}
    </button>
  );
};
