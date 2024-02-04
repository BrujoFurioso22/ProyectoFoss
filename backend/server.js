import express from "express";
import cors from "cors";
import mysql from "mysql2"
import userRoutes from "./Usuarios/userRoutes.js";
import profesorRoutes from "./Profesor/profesorRoutes.js";
import juegosRoutes from "./Juegos/juegosRoutes.js";
import adminRoutes from "./Administrador/adminRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.get("/", (req, res) => {
  return res.json("FROM BACKEND SIDE");
});

app.use("/usuarios", userRoutes);
app.use("/profesor", profesorRoutes);
app.use("/juegos", juegosRoutes);
app.use("/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Listening 5000");
});
