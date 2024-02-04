import { db } from "../db.js";

export const consultarEstudiantes = (req, res) => {
  const profesorID = req.params.idprofesor;
  const q = `SELECT idestudiantes, estudiantes.nombre,estudiantes.correo, estudiantes.institucion, estudiantes.sexo FROM baseerasmus.profesores, baseerasmus.estudiantes, baseerasmus.asignados where profesores.idprofesores = asignados.iddeprofesor and estudiantes.idestudiantes = asignados.iddeestudiante and profesores.idprofesores = ${profesorID};`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const obtenerIDprofesor = (req, res) => {
  const { correoProfesor } = req.params;
  const q = `SELECT profesores.idprofesores FROM baseerasmus.profesores WHERE profesores.correo = '${correoProfesor}'`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
export const eliminarEstudiantedeProfesor = (req, res) => {
  const { idestudiante, idprofesor } = req.query;
  const q =
    "DELETE FROM baseerasmus.asignados WHERE iddeestudiante = ? and iddeprofesor = ?";
  db.query(q, [idestudiante, idprofesor], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const idUsuario = (req, res) => {
  const correo = req.params.correo;
  const q = `SELECT idestudiantes FROM estudiantes WHERE correo = '${correo}'`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const asignarEstudiantesAProfesor = (req, res) => {
  // Obtener datos del cuerpo de la solicitud
  const { idestudiante, idprofesor } = req.body;

  // Verificar si el usuario ya existe
  const checkUserQuery = `SELECT * FROM baseerasmus.asignados WHERE iddeestudiante = '${idestudiante}'`;

  db.query(checkUserQuery, (checkErr, checkData) => {
    if (checkErr) return res.json(checkErr);

    // Si el usuario ya existe, devolver un mensaje de error
    if (checkData.length > 0) {
      return res.json({
        message: "Usuario ya asignado",
      });
    }

    // Si el usuario no existe, realizar la inserción en la base de datos
    const insertUserQuery = `INSERT INTO baseerasmus.asignados (iddeestudiante, iddeprofesor) VALUES ('${idestudiante}' ,'${idprofesor}')`;

    db.query(insertUserQuery, (insertErr, insertData) => {
      if (insertErr) return res.json(insertErr);

      return res.json({
        message: "Asignacion creada correctamente",
        usuario: { idestudiante, idprofesor },
      });
    });
  });
};

export const consultarReporteEstudianteJuego = (req, res) => {
  const { idestudiante, numjuego } = req.params;
  const q = `SELECT DATE_FORMAT(fechajugada, "%d/%m/%Y") as 'Fecha', calificacion FROM baseerasmus.jugada WHERE jugada.idestudiante = ${idestudiante} and jugada.juego = '${numjuego}' order by fechajugada DESC;`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
export const consultarReporteEstudianteJuegoTotal = (req, res) => {
  const { idestudiante, numjuego } = req.params;
  const q = `SELECT SUM(calificacion) as 'totCalificacion' FROM baseerasmus.jugada WHERE jugada.idestudiante = ${idestudiante} and jugada.juego = '${numjuego}' order by fechajugada DESC;`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
export const consultarReporteEstudianteJuegoFecha = (req, res) => {
  const { idestudiante, numjuego, fechaI, fechaF } = req.params;
  const q = `SELECT DATE_FORMAT(fechajugada, "%d/%m/%Y") as 'Fecha', calificacion FROM baseerasmus.jugada WHERE jugada.idestudiante = ${idestudiante} and jugada.juego = '${numjuego}' and fechajugada BETWEEN '${fechaI}' AND '${fechaF}' order by fechajugada DESC;`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
export const consultarReporteEstudianteJuegoTotalFecha = (req, res) => {
  const { idestudiante, numjuego, fechaI, fechaF } = req.params;
  const q = `SELECT SUM(calificacion) as 'totCalificacion' FROM baseerasmus.jugada WHERE jugada.idestudiante = ${idestudiante} and jugada.juego = '${numjuego}' and fechajugada BETWEEN '${fechaI}' AND '${fechaF}' order by fechajugada DESC;`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
