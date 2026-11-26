CREATE DATABASE IF NOT EXISTS controlescolar
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE controlescolar;

-- Tabla de usuarios para el login
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(50) NOT NULL
);

-- Usuario de prueba
INSERT INTO usuarios (usuario, contrasena) VALUES
('christopher.paat', '12345');

-- Tabla de estudiantes
DROP TABLE IF EXISTS estudiantes;
CREATE TABLE estudiantes (
    matricula VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellidoPaterno VARCHAR(60) NOT NULL,
    apellidoMaterno VARCHAR(60) NOT NULL,
    edad TINYINT UNSIGNED NOT NULL
);

INSERT INTO estudiantes (matricula, nombre, apellidoPaterno, apellidoMaterno, edad) VALUES
('a24216351', 'Pedro Antonio', 'Ferrera', 'Ortiz', 20),
('a24216352', 'Gabriela María', 'Cetina', 'Novelo', 19);
