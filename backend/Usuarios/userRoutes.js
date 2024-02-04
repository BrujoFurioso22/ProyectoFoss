import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  validateUser,
  crearConfiguracionesJuegos
} from "./userControllers.js";

const router = express.Router();

// Definir rutas
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:correo/:password", validateUser);
router.post("/crear", createUser);
router.post("/crearConfiguraciones", crearConfiguracionesJuegos);
// Agregar más rutas y consultas según sea necesario

export default router;
