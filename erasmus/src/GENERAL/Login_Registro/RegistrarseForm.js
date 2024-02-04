import React, { useState } from "react";
import {
  CrearConfiguraciones,
  CrearUsuario,
} from "CONFIG/BACKEND/Consultas/LoginRegister";
import { ConsultaIDprofesor } from "CONFIG/BACKEND/Consultas/Profesor";

export function Registrarse() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    tipo: "",
    sexo: "",
    institucion: "",
    cedula: "",
    email: "",
    password: "",
    confpassword:""
  });
  const [mensajeError, setMensajeError] = useState("");
  const [validacion, setValidacion] = useState(0);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfPassword, setMostrarConfPassword] = useState(false);

  const CreacionUsuario = async () => {
    try {
      const validar = await CrearUsuario(
        usuario.nombre,
        usuario.tipo,
        usuario.email,
        usuario.password,
        usuario.institucion,
        usuario.sexo,
        usuario.cedula
      );
      if (validar.message === "1") {
        setMensajeError("El correo ya se encuentra registrado");
        setValidacion(0);
      } else {
        setMensajeError("Usuario Creado Correctamente");
        setValidacion(1);
        if (usuario.tipo === "PR") {
          const res = await ConsultaIDprofesor(usuario.email);
          if (res.length > 0) {
            const idprof = res[0].idprofesores;
            const res1 = await CrearConfiguraciones(idprof);
            console.log(res1);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setUsuario({
      ...usuario,
      [evt.target.name]: value,
    });
  };
  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };
  const toggleMostrarConfPassword = () => {
    setMostrarConfPassword(!mostrarConfPassword);
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const cedulaLength = usuario.cedula.length;
    if (cedulaLength !== 10 && cedulaLength !== 13) {
      setValidacion(0);
      setMensajeError("La cédula debe tener 10 o 13 dígitos.");
      return; // Evitar que la acción del formulario se ejecute
    }
    const tipoUsu = usuario.tipo;
    if (tipoUsu.replace(" ", "") === "") {
      setValidacion(0);
      setMensajeError("Elija un tipo de usuario.");
      return; // Evitar que la acción del formulario se ejecute
    }
    const sexo = usuario.sexo;
    if (sexo.replace(" ", "") === "") {
      setValidacion(0);
      setMensajeError("Elija un sexo.");
      return; // Evitar que la acción del formulario se ejecute
    }
    const psw1 = usuario.password;
    const psw2 = usuario.confpassword;

    if (psw1 !== psw2) {
      setValidacion(0);
      setMensajeError("Las contraseñas coinciden");
      return; // Evitar que la acción del formulario se ejecute
    }

    await CreacionUsuario();

    setUsuario({
      nombre: "",
      tipo: "",
      sexo: "",
      institucion: "",
      cedula: "",
      email: "",
      password: "",
      confpassword: "",
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="formLogin">
        <h1 className="h1Login">Crea una cuenta</h1>
        <input
          type="text"
          name="nombre"
          value={usuario.nombre}
          onChange={handleChange}
          placeholder="Nombre Completo"
          className="inputLogin"
          required={true}
        />
        <input
          type="text"
          name="institucion"
          value={usuario.institucion}
          onChange={handleChange}
          placeholder="Institución"
          className="inputLogin"
          required={true}
        />
        <input
          type="text"
          name="cedula"
          value={usuario.cedula}
          onChange={handleChange}
          placeholder="Cédula"
          min={10}
          max={13}
          className="inputLogin"
          required={true}
        />
        <select
          name="tipo"
          value={usuario.tipo}
          onChange={handleChange}
          className="inputLogin"
          required={true}
        >
          <option value="">Seleccione tipo de usuario</option>
          <option value="EST">Estudiante</option>
          <option value="PR">Profesor</option>
        </select>
        <select
          name="sexo"
          value={usuario.sexo}
          onChange={handleChange}
          className="inputLogin"
          required={true}
        >
          <option value="">Seleccione sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        <input
          type="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          placeholder="Correo"
          className="inputLogin"
          required={true}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type={mostrarPassword ? "text" : "password"}
            name="password"
            value={usuario.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="inputLogin"
            required={true}
          />
          <span
            style={{ userSelect: "none", cursor: "pointer", fontSize:"20px" }}
            onClick={toggleMostrarPassword}
          >
            {mostrarPassword ? (
              <i className="bi bi-eye-slash-fill"></i>
            ) : (
              <i className="bi bi-eye-fill"></i>
            )}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type={mostrarConfPassword ? "text" : "password"}
            name="confpassword"
            value={usuario.confpassword}
            onChange={handleChange}
            placeholder="Confirmar Contraseña"
            className="inputLogin"
            required={true}
          />
          <span
            style={{ userSelect: "none", cursor: "pointer", fontSize:"20px" }}
            onClick={toggleMostrarConfPassword}
          >
            {mostrarConfPassword ? (
              <i className="bi bi-eye-slash-fill"></i>
            ) : (
              <i className="bi bi-eye-fill"></i>
            )}
          </span>
        </div>

        <span style={validacion === 0 ? { color: "red" } : { color: "green" }}>
          {mensajeError}
        </span>
        <button className="botonLogin">Registrarse</button>
      </form>
    </div>
  );
}
