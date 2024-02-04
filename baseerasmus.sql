-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: baseerasmus
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `idadministrador` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `tipodeusuario` varchar(3) NOT NULL DEFAULT 'ADM',
  PRIMARY KEY (`idadministrador`),
  KEY `FK_idadm_idusu_idx` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'admin@gmail.com','123','admin','ADM');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignados`
--

DROP TABLE IF EXISTS `asignados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignados` (
  `idasignados` int NOT NULL AUTO_INCREMENT,
  `iddeestudiante` int NOT NULL,
  `iddeprofesor` int NOT NULL,
  PRIMARY KEY (`idasignados`),
  UNIQUE KEY `iddeestudiante_UNIQUE` (`iddeestudiante`),
  KEY `fk_ide_idu_idx` (`iddeestudiante`),
  KEY `fk_idp_idu_idx` (`iddeprofesor`),
  CONSTRAINT `fk_ide_idu` FOREIGN KEY (`iddeestudiante`) REFERENCES `estudiantes` (`idestudiantes`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_idp_idu` FOREIGN KEY (`iddeprofesor`) REFERENCES `profesores` (`idprofesores`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignados`
--

LOCK TABLES `asignados` WRITE;
/*!40000 ALTER TABLE `asignados` DISABLE KEYS */;
INSERT INTO `asignados` VALUES (12,1,1),(15,3,1),(23,2,13),(24,4,1);
/*!40000 ALTER TABLE `asignados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `idestudiantes` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(45) NOT NULL,
  `institucion` varchar(45) NOT NULL,
  `sexo` varchar(1) NOT NULL DEFAULT 'M',
  `tipodeusuario` varchar(3) NOT NULL DEFAULT 'EST',
  `cedula` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`idestudiantes`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (1,'Pedro Figueroa','pedro@gmail.com','1234','UDA','M','EST',NULL),(2,'Sthefany Peñafiel','tefy@gmail.com','1234','UDA','M','EST',NULL),(3,'Diego Barbecho','diego@gmail.com','1234','UDA','M','EST','0106652613'),(4,'Pepito Camelo','pepito@gmail.com','1234','Universidad del Azuay','M','EST','0102928345');
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `idimagenes` int NOT NULL AUTO_INCREMENT,
  `nombreimagen` varchar(100) NOT NULL,
  `rutaimagen` varchar(200) NOT NULL,
  `grupoimagen` int NOT NULL DEFAULT '1',
  `estado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idimagenes`),
  UNIQUE KEY `nombreimagen_UNIQUE` (`nombreimagen`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (34,'Arriba','/imagenesJuego/arrow-up.svg',1,1),(35,'Abajo','/imagenesJuego/arrow-down.svg',1,1),(36,'Izquierda','/imagenesJuego/arrow-izquierda.svg',1,1),(37,'Derecha','/imagenesJuego/arrow-derecha.svg',1,1),(38,'Barrer','/imagenesJuego/imagen1.png',2,1),(39,'Tomar','/imagenesJuego/imagen2.png',2,1),(40,'Ahorrar','/imagenesJuego/imagen3.png',2,1),(41,'BatidoGuineo','/imagenesJuego/imagen4.png',2,1),(42,'Te','/imagenesJuego/imagen5.png',2,1),(43,'Helado','/imagenesJuego/imagen6.png',2,1),(44,'Carro','/imagenesJuego/imagen7.png',2,1),(45,'Avion','/imagenesJuego/imagen8.png',2,1),(46,'Bicicleta','/imagenesJuego/imagen9.png',2,1),(47,'Tarea1','/imagenesJuego/actividad1.jpg',3,1),(48,'TareaLineas1','/imagenesJuego/preescritura-para-dos-anos.png',3,0),(49,'Avatar','/imagenesJuego/diego.svg',1,0);
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juego1`
--

DROP TABLE IF EXISTS `juego1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juego1` (
  `idjuego1` int NOT NULL AUTO_INCREMENT,
  `img1` int DEFAULT NULL,
  `img2` int DEFAULT NULL,
  `img3` int DEFAULT NULL,
  `img4` int DEFAULT NULL,
  `numRondas` int NOT NULL DEFAULT '5',
  `idprofesor` int NOT NULL,
  PRIMARY KEY (`idjuego1`),
  KEY `FK_j1i1_img_idx` (`img1`),
  KEY `FK_j1i2_img_idx` (`img2`),
  KEY `FK_j1i3_img_idx` (`img3`),
  KEY `FK_j1i4_img_idx` (`img4`),
  KEY `fk_profesor_config_idx` (`idprofesor`),
  CONSTRAINT `fk_1` FOREIGN KEY (`img1`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_2` FOREIGN KEY (`img2`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_3` FOREIGN KEY (`img3`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_4` FOREIGN KEY (`img4`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_profesor_config` FOREIGN KEY (`idprofesor`) REFERENCES `profesores` (`idprofesores`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juego1`
--

LOCK TABLES `juego1` WRITE;
/*!40000 ALTER TABLE `juego1` DISABLE KEYS */;
INSERT INTO `juego1` VALUES (1,34,37,35,36,5,1),(11,NULL,NULL,NULL,NULL,5,13),(12,NULL,NULL,NULL,NULL,5,14);
/*!40000 ALTER TABLE `juego1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juego2`
--

DROP TABLE IF EXISTS `juego2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juego2` (
  `idjuego2` int NOT NULL AUTO_INCREMENT,
  `img1` int DEFAULT NULL,
  `img2` int DEFAULT NULL,
  `img3` int DEFAULT NULL,
  `img4` int DEFAULT NULL,
  `img5` int DEFAULT NULL,
  `img6` int DEFAULT NULL,
  `img7` int DEFAULT NULL,
  `img8` int DEFAULT NULL,
  `img9` int DEFAULT NULL,
  `idprofesor` int NOT NULL,
  `numCartas` int DEFAULT '3',
  PRIMARY KEY (`idjuego2`),
  KEY `FK_j2i1_img_idx` (`img1`),
  KEY `FK_j2i2_img_idx` (`img2`),
  KEY `FK_j2i4_img_idx` (`img4`),
  KEY `FK_j2i3_img_idx` (`img3`),
  KEY `FK_j2i5_img_idx` (`img5`),
  KEY `FK_j2i6_img_idx` (`img6`),
  KEY `FK_j2i7_img_idx` (`img7`),
  KEY `FK_j2i8_img_idx` (`img8`),
  KEY `FK_j2i9_img_idx` (`img9`),
  KEY `FK_profesor_config2_idx` (`idprofesor`),
  CONSTRAINT `FK_j2i1_img` FOREIGN KEY (`img1`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j2i2_img` FOREIGN KEY (`img2`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j2i3_img` FOREIGN KEY (`img3`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j2i4_img` FOREIGN KEY (`img4`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j2i5_img` FOREIGN KEY (`img5`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j2i6_img` FOREIGN KEY (`img6`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j2i7_img` FOREIGN KEY (`img7`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j2i8_img` FOREIGN KEY (`img8`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j2i9_img` FOREIGN KEY (`img9`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_profesor_p` FOREIGN KEY (`idprofesor`) REFERENCES `profesores` (`idprofesores`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juego2`
--

LOCK TABLES `juego2` WRITE;
/*!40000 ALTER TABLE `juego2` DISABLE KEYS */;
INSERT INTO `juego2` VALUES (1,38,39,40,41,42,43,44,45,46,1,3),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,13,3),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,14,3);
/*!40000 ALTER TABLE `juego2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juego3`
--

DROP TABLE IF EXISTS `juego3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juego3` (
  `idjuego3` int NOT NULL AUTO_INCREMENT,
  `img1` int DEFAULT NULL,
  `ordenJuego` varchar(500) DEFAULT 'Bienvenido al pizarrón',
  `idprofesor` int NOT NULL,
  PRIMARY KEY (`idjuego3`),
  KEY `FK_j3i1_img_idx` (`img1`),
  KEY `FK_profesor_config3_idx` (`idprofesor`),
  CONSTRAINT `FK_j3i1_img` FOREIGN KEY (`img1`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_profesor_config3` FOREIGN KEY (`idprofesor`) REFERENCES `profesores` (`idprofesores`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juego3`
--

LOCK TABLES `juego3` WRITE;
/*!40000 ALTER TABLE `juego3` DISABLE KEYS */;
INSERT INTO `juego3` VALUES (1,47,'Bienvenido al pizarrón estudiante, hoy vamos a dibujar el camino a casa para los niños, a jugar! Tendran que dibujar una linea de color morado para poder hacer que los niños lleguen al arbol de navidad',1),(6,NULL,'Bienvenido al pizarrón',13),(7,NULL,'Bienvenido al pizarrón',14);
/*!40000 ALTER TABLE `juego3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juego4`
--

DROP TABLE IF EXISTS `juego4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juego4` (
  `idjuego4` int NOT NULL AUTO_INCREMENT,
  `img1` int DEFAULT NULL,
  `img2` int DEFAULT NULL,
  `img3` int DEFAULT NULL,
  `velocidad` int NOT NULL DEFAULT '1',
  `idcorrecto` int DEFAULT NULL,
  `idprofesor` int NOT NULL,
  PRIMARY KEY (`idjuego4`),
  KEY `FK_j4i1_img_idx` (`img1`),
  KEY `FK_j4i2_img_idx` (`img2`),
  KEY `FK_j4i3_img_idx` (`img3`),
  KEY `FK_profesor_config_idx` (`idprofesor`),
  KEY `FK_img_correcto_idx` (`idcorrecto`),
  CONSTRAINT `FK_img_correcto` FOREIGN KEY (`idcorrecto`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j4i1_img` FOREIGN KEY (`img1`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j4i2_img` FOREIGN KEY (`img2`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_j4i3_img` FOREIGN KEY (`img3`) REFERENCES `imagenes` (`idimagenes`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_profesor_config4` FOREIGN KEY (`idprofesor`) REFERENCES `profesores` (`idprofesores`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juego4`
--

LOCK TABLES `juego4` WRITE;
/*!40000 ALTER TABLE `juego4` DISABLE KEYS */;
INSERT INTO `juego4` VALUES (1,NULL,NULL,NULL,1,NULL,1),(5,NULL,NULL,NULL,1,NULL,13),(6,NULL,NULL,NULL,1,NULL,14);
/*!40000 ALTER TABLE `juego4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugada`
--

DROP TABLE IF EXISTS `jugada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugada` (
  `idjugada` int NOT NULL AUTO_INCREMENT,
  `idestudiante` int NOT NULL,
  `juego` varchar(6) NOT NULL,
  `calificacion` int NOT NULL,
  `fechajugada` datetime DEFAULT NULL,
  PRIMARY KEY (`idjugada`),
  KEY `FK_est_est_idx` (`idestudiante`),
  CONSTRAINT `FK_est_est` FOREIGN KEY (`idestudiante`) REFERENCES `estudiantes` (`idestudiantes`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugada`
--

LOCK TABLES `jugada` WRITE;
/*!40000 ALTER TABLE `jugada` DISABLE KEYS */;
INSERT INTO `jugada` VALUES (1,1,'juego1',3,'2024-01-15 00:00:00'),(2,1,'juego1',1,'2023-02-20 00:00:00'),(171,3,'juego1',3,'2024-01-16 00:00:00'),(172,3,'juego1',1,'2024-01-15 00:00:00'),(173,3,'juego1',1,'2024-01-15 00:00:00'),(174,3,'juego1',1,'2024-01-15 00:00:00'),(175,3,'juego1',1,'2024-01-16 00:00:00'),(176,3,'juego1',1,'2024-01-16 00:00:00'),(177,3,'juego1',1,'2024-01-14 00:00:00'),(178,3,'juego1',1,'2024-01-16 00:00:00'),(179,3,'juego1',1,'2024-01-16 00:00:00'),(180,3,'juego1',1,'2024-01-16 00:00:00'),(181,3,'juego1',1,'2024-01-16 00:00:00'),(182,3,'juego1',1,'2024-01-16 00:00:00'),(183,3,'juego1',1,'2024-01-16 00:00:00'),(184,3,'juego1',1,'2024-01-16 00:00:00'),(185,3,'juego1',1,'2024-01-16 00:00:00'),(186,3,'juego1',0,'2024-01-16 00:00:00'),(187,3,'juego2',0,'2024-01-16 00:00:00'),(188,3,'juego2',0,'2024-01-16 00:00:00'),(189,3,'juego1',0,'2024-01-20 00:00:00'),(190,3,'juego1',0,'2024-01-20 00:00:00'),(191,3,'juego1',1,'2024-01-20 00:00:00'),(192,3,'juego1',1,'2024-01-20 00:00:00'),(193,3,'juego1',1,'2024-01-20 00:00:00'),(194,3,'juego2',1,'2024-01-20 00:00:00'),(195,3,'juego2',0,'2024-01-20 00:00:00'),(196,3,'juego2',1,'2024-01-20 00:00:00'),(197,3,'juego2',1,'2024-01-20 00:00:00'),(198,3,'juego2',1,'2024-01-20 00:00:00'),(199,3,'juego2',0,'2024-01-20 00:00:00'),(200,3,'juego2',1,'2024-01-20 00:00:00'),(201,3,'juego2',1,'2024-01-20 00:00:00'),(202,3,'juego1',0,'2024-01-21 00:00:00'),(203,3,'juego1',0,'2024-01-21 00:00:00'),(204,3,'juego1',0,'2024-01-21 00:00:00'),(205,3,'juego1',0,'2024-01-21 00:00:00'),(206,3,'juego1',1,'2024-01-21 00:00:00'),(207,3,'juego2',0,'2024-01-21 00:00:00'),(208,3,'juego1',0,'2024-01-22 00:00:00'),(209,3,'juego1',0,'2024-01-22 00:00:00'),(210,3,'juego1',1,'2024-01-22 00:00:00'),(211,3,'juego1',0,'2024-01-22 00:00:00'),(212,3,'juego1',0,'2024-01-22 00:00:00'),(213,3,'juego1',1,'2024-01-22 00:00:00'),(214,3,'juego1',1,'2024-01-22 00:00:00'),(215,3,'juego1',1,'2024-01-22 00:00:00'),(216,3,'juego1',1,'2024-01-22 00:00:00'),(217,3,'juego1',1,'2024-01-22 00:00:00'),(218,3,'juego1',1,'2024-01-22 00:00:00'),(219,3,'juego1',1,'2024-01-22 00:00:00'),(220,3,'juego2',1,'2024-01-29 00:00:00');
/*!40000 ALTER TABLE `jugada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `idprofesores` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(45) NOT NULL,
  `institucion` varchar(45) NOT NULL,
  `sexo` varchar(1) NOT NULL DEFAULT 'M',
  `tipodeusuario` varchar(2) NOT NULL DEFAULT 'PR',
  `cedula` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`idprofesores`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (1,'Elisa Ampuero','eli@gmail.com','1234','UDA','F','PR',NULL),(13,'Fabian Carvajal','fabian@gmail.com','123','Universidad del Azuay','M','PR','0106652613'),(14,'Kevin Campoverde','kev@gmail.com','1234','Universidad del Azuay','M','PR','0102695621');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-29 22:26:31
