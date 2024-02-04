import { db } from "../db.js";

export const getAllUsers = (req, res) => {
  const q = "SELECT * FROM usuarios";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const getUserById = (req, res) => {
  const userId = req.params.id;
  const q = `SELECT * FROM usuarios WHERE idusuarios = ${userId}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const validateUser = (req, res) => {
  const correo = req.params.correo;
  const contrasena = req.params.password;
  const q = `SELECT * FROM estudiantes WHERE correo = '${correo}' and contrasena = '${contrasena}'`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      return res.json(data);
    } else {
      const q = `SELECT * FROM profesores WHERE correo = '${correo}' and contrasena = '${contrasena}'`;
      db.query(q, (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
          return res.json(data);
        } else {
          const q = `SELECT * FROM administrador WHERE correo = '${correo}' and contrasena = '${contrasena}'`;
          db.query(q, (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
          });
        }
      });
    }
  });
};

export const createUser = (req, res) => {
  // Obtener datos del cuerpo de la solicitud
  const { nombre, tipo, correo, password, institucion, sexo, cedula} = req.body;
  let tabla = "";

  if (tipo === "EST") {
    tabla = "estudiantes";
  } else {
    tabla = "profesores";
  }

  // Verificar si el usuario ya existe
  const checkUserQuery = `SELECT * FROM ${tabla} WHERE correo = '${correo}'`;

  db.query(checkUserQuery, (checkErr, checkData) => {
    if (checkErr) return res.json(checkErr);

    // Si el usuario ya existe, devolver un mensaje de error
    if (checkData.length > 0) {
      return res.json({
        message: "1",
      });
    }

    // Si el usuario no existe, realizar la inserción en la base de datos
    const insertUserQuery = `INSERT INTO ${tabla} (nombre, correo, contrasena, tipodeusuario, institucion, sexo, cedula) VALUES ('${nombre}' ,'${correo}', '${password}', '${tipo}', '${institucion}' ,'${sexo}', '${cedula}')`;
    db.query(insertUserQuery, (insertErr, insertData) => {
      if (insertErr) return res.json(insertErr);

      return res.json({
        message: "Usuario creado correctamente",
        usuario: { nombre, institucion, sexo, tipo, correo, password, cedula },
      });
    });
  });
};
export const crearConfiguracionesJuegos = (req, res) => {
  // Obtener datos del cuerpo de la solicitud
  const { idprofesor } = req.body;
  let contador = 0;

  const insertUserQuery = `INSERT INTO baseerasmus.juego1 (idprofesor) VALUES ('${idprofesor}')`;
  db.query(insertUserQuery, (insertErr, insertData) => {
    if (insertErr) return res.json(insertErr);
    contador++;

    const insertUserQuery1 = `INSERT INTO baseerasmus.juego2 (idprofesor) VALUES ('${idprofesor}')`;
    db.query(insertUserQuery1, (insertErr, insertData) => {
      if (insertErr) return res.json(insertErr);
      contador++;

      const insertUserQuery1 = `INSERT INTO baseerasmus.juego3 (idprofesor) VALUES ('${idprofesor}')`;
      db.query(insertUserQuery1, (insertErr, insertData) => {
        if (insertErr) return res.json(insertErr);
        contador++;

        const insertUserQuery1 = `INSERT INTO baseerasmus.juego4 (idprofesor) VALUES ('${idprofesor}')`;
        db.query(insertUserQuery1, (insertErr, insertData) => {
          if (insertErr) return res.json(insertErr);
          contador++;

          return res.json({
            message: `Insertado ${contador}/4, correcta`,
          });
        });
      });
    });
  });
};

// Agregar más servicios según sea necesario
