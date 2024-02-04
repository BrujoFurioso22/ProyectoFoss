import express from "express";
import {
  consultarEstudiantes,
  idUsuario,
  asignarEstudiantesAProfesor,
  eliminarEstudiantedeProfesor,
  obtenerIDprofesor,
  consultarReporteEstudianteJuego,
  consultarReporteEstudianteJuegoTotal,
  consultarReporteEstudianteJuegoFecha,
  consultarReporteEstudianteJuegoTotalFecha
} from "./profesorControllers.js";

const router = express.Router();

// Definir rutas
// router.get("/", getAllUsers);
router.get("/:idprofesor", consultarEstudiantes);
router.get("/obtenerIDprofesor/:correoProfesor", obtenerIDprofesor);
router.get("/idEstudiante/:correo", idUsuario);
router.post("/crearAsignacion", asignarEstudiantesAProfesor);
router.delete("/eliminarAsignacion", eliminarEstudiantedeProfesor);
router.get(
  "/obtenerReporteEstJuego/:idestudiante/:numjuego",
  consultarReporteEstudianteJuego
);
router.get(
  "/obtenerReporteEstJuegoTotal/:idestudiante/:numjuego",
  consultarReporteEstudianteJuegoTotal
);
router.get(
  "/obtenerReporteEstJuegoFecha/:idestudiante/:numjuego/:fechaI/:fechaF",
  consultarReporteEstudianteJuegoFecha
);
router.get(
  "/obtenerReporteEstJuegoTotalFecha/:idestudiante/:numjuego/:fechaI/:fechaF",
  consultarReporteEstudianteJuegoTotalFecha
);

// router.get("/:correo/:password", validateUser);
// router.post("/crear", createUser);
// Agregar más rutas y consultas según sea necesario

export default router;
