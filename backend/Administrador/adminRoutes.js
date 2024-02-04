import express from "express";
import multer from "multer";

import {
  ConsultarImagenesAdmin,
  EstadoImagenAdmin,
  SubirImagen,
} from "./adminControllers.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../backend/public/imagenesJuego/"); // Ruta donde se guardarán los archivos subidos
  },
  filename: function (req, file, cb) {
    // Modificar el nombre del archivo si es necesario
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Definir rutas
router.get("/consultarImagenes/:numJuego", ConsultarImagenesAdmin);
router.get("/consultarImagenes/:numJuego", ConsultarImagenesAdmin);
router.post("/cambiarEstadoImagenAdmin", EstadoImagenAdmin);
router.post("/subirImagen/:numJuego/:nombreimagen", upload.single("file"), SubirImagen);

export default router;
