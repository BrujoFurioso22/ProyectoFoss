import { db } from "../db.js";
import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../imagenesJuegos"); // Ruta donde se guardarán los archivos subidos
  },
  filename: function (req, file, cb) {
    // Modificar el nombre del archivo si es necesario
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export const ConsultarImagenesAdmin = (req, res) => {
  const { numJuego } = req.params;
  const q = `SELECT * FROM baseerasmus.imagenes WHERE imagenes.grupoimagen = ${numJuego};`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const EstadoImagenAdmin = (req, res) => {
  const { idimagen, estado } = req.body;
  const q = `UPDATE baseerasmus.imagenes SET estado = ${estado} WHERE idimagenes = ${idimagen};`;
  db.query(q, [estado, idimagen], (err, data) => {
    if (err) return res.json(err);
    return res.json({
      message: "Cambio de estado de imagen correcta",
      correcta: 1,
      imagen: { idimagen, estado },
    });
  });
};

export const SubirImagen = (req, res, next) => {
  const { file } = req;
  const { numJuego, nombreimagen } = req.params;
  console.log(file);

  const q = `SELECT imagenes.nombreimagen FROM baseerasmus.imagenes WHERE imagenes.nombreimagen = '${nombreimagen}';`;
  db.query(q, (err, data) => {
    if (err) {
      return res.json({
        message: "Error al insertar en la base de datos",
        correcta: 0,
      });
    }

    if (data.length <= 0) {
      const q = `INSERT INTO baseerasmus.imagenes (nombreimagen,rutaimagen,grupoimagen) VALUES('${nombreimagen}','${
        "/imagenesJuego/" + file.originalname
      }','${numJuego}');`;
      db.query(q, (err, data) => {
        if (err) {
          return res.json({
            message: "Llave duplicada",
            correcta: 0,
          });
        }

        return res.json({
          message: "Imagen cargada correctamente",
          correcta: 1,
          imagen: { file, numJuego },
        });
      });
    } else {
      return res.json({
        message: "Existente",
        correcta: 1,
        imagen: { file, numJuego },
      });
    }
  });
};
