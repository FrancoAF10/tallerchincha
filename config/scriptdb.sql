 CREATE DATABASE TALLERCHINCHA;
 USE TALLERCHINCHA;
 
 CREATE TABLE IF NOT EXISTS MARCAS(
 idmarca		INT AUTO_INCREMENT PRIMARY KEY,
 marca			VARCHAR(40) NOT NULL,
 CONSTRAINT uk_marca_ma UNIQUE(marca)
 )ENGINE=INNODB;
 
 CREATE TABLE IF NOT EXISTS VEHICULOS(
 idvehiculo		INT AUTO_INCREMENT PRIMARY KEY,
 idmarca		INT NOT NULL,
 modelo			VARCHAR(40) NOT NULL,
 color			VARCHAR(40) NOT NULL,
 combustible  	ENUM('Diesel','Gasolina','GLP','GNV','Híbrido'),
 afabricacion	CHAR(4) NOT NULL,
 condicion 		ENUM('Nuevo','Seminuevo'),
 CONSTRAINT fk_idmarca_veh FOREIGN KEY (idmarca) REFERENCES MARCAS (idmarca)
 )ENGINE=INNODB;
 INSERT INTO MARCAS (marca) VALUES
 ('Kia'),
 ('Toyota');
 
 INSERT INTO VEHICULOS(idmarca,modelo,color,combustible,afabricacion,condicion)VALUES
 (2,'Sorento','negro','Gasolina','2023','Seminuevo'),
 (1,'Hilux','Blanco','Diesel','2025','Nuevo');