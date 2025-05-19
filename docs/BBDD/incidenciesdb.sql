-- Adminer 4.17.1 MySQL 5.7.44 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `Actuacios`;
CREATE TABLE `Actuacios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temps` varchar(255) DEFAULT NULL,
  `id_incidencia` int(11) NOT NULL,
  `id_tecnic` int(11) DEFAULT NULL,
  `descripcio_actuacio` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_incidencia` (`id_incidencia`),
  KEY `id_tecnic` (`id_tecnic`),
  CONSTRAINT `Actuacios_ibfk_1` FOREIGN KEY (`id_incidencia`) REFERENCES `Incidencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Actuacios_ibfk_2` FOREIGN KEY (`id_tecnic`) REFERENCES `Tecnics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Actuacios` (`id`, `temps`, `id_incidencia`, `id_tecnic`, `descripcio_actuacio`, `createdAt`, `updatedAt`) VALUES
(1,	NULL,	1,	1,	'Revisió inicial',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(2,	NULL,	1,	1,	'Resolució de l\'error',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(3,	NULL,	1,	1,	'Verificació final',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(4,	NULL,	2,	2,	'Revisió inicial',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(5,	NULL,	2,	2,	'Resolució de l\'error',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(6,	NULL,	2,	2,	'Verificació final',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(7,	NULL,	3,	3,	'Revisió inicial',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(8,	NULL,	3,	3,	'Resolució de l\'error',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(9,	NULL,	3,	3,	'Verificació final',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(10,	NULL,	4,	4,	'Revisió inicial',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(11,	NULL,	4,	4,	'Resolució de l\'error',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(12,	NULL,	4,	4,	'Verificació final',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(13,	NULL,	5,	5,	'Revisió inicial',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(14,	NULL,	5,	5,	'Resolució de l\'error',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(15,	NULL,	5,	5,	'Verificació final',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59');

DROP TABLE IF EXISTS `Departaments`;
CREATE TABLE `Departaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_dpt` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Departaments` (`id`, `nom_dpt`, `createdAt`, `updatedAt`) VALUES
(1,	'Matemàtiques',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(2,	'Llengua Castellana',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(3,	'Llengua Catalana',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(4,	'Ciències Socials',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(5,	'Ciències Naturals',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(6,	'Educació Física',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(7,	'Anglès',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(8,	'Llengües Estrangeres',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(9,	'Filosofia',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(10,	'Tecnologia',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(11,	'Informàtica',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(12,	'Educació Plàstica i Visual',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(13,	'Música',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(14,	'Secretaria',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(15,	'Administració',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(16,	'Recursos Humans',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(17,	'Direcció',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(18,	'Coordinació de Cicles Formatius',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(19,	'Biblioteca Escolar',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59');

DROP TABLE IF EXISTS `Incidencia`;
CREATE TABLE `Incidencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_departament` int(11) NOT NULL,
  `id_tecnic` int(11) DEFAULT NULL,
  `id_tipus` int(11) DEFAULT NULL,
  `descripcio` varchar(255) NOT NULL,
  `prioritat` enum('Baixa','Mitjana','Alta') DEFAULT NULL,
  `estat` enum('Resolt','No resolt') NOT NULL DEFAULT 'No resolt',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_departament` (`id_departament`),
  KEY `id_tecnic` (`id_tecnic`),
  KEY `id_tipus` (`id_tipus`),
  CONSTRAINT `Incidencia_ibfk_1` FOREIGN KEY (`id_departament`) REFERENCES `Departaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Incidencia_ibfk_2` FOREIGN KEY (`id_tecnic`) REFERENCES `Tecnics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Incidencia_ibfk_3` FOREIGN KEY (`id_tipus`) REFERENCES `Tipus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Incidencia` (`id`, `id_departament`, `id_tecnic`, `id_tipus`, `descripcio`, `prioritat`, `estat`, `createdAt`, `updatedAt`) VALUES
(1,	1,	1,	1,	'Error en la impressora',	'Alta',	'No resolt',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(2,	2,	2,	2,	'Error de xarxa',	'Alta',	'No resolt',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(3,	3,	3,	3,	'Error en la página web',	'Mitjana',	'No resolt',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(4,	4,	4,	4,	'Cablejat desordenat',	'Baixa',	'No resolt',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(5,	5,	5,	5,	'Pantalla en mal estat',	'Mitjana',	'No resolt',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59');

DROP TABLE IF EXISTS `Tecnics`;
CREATE TABLE `Tecnics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Tecnics` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1,	'Joan Pérez',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(2,	'Maria López',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(3,	'Carles Garcia',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(4,	'Anna Martínez',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(5,	'Pere Font',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(6,	'Laura Vidal',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(7,	'Marc Soler',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(8,	'Clara Roca',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(9,	'Jordi Serra',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(10,	'Marta Bosch',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59');

DROP TABLE IF EXISTS `Tipus`;
CREATE TABLE `Tipus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_tipus` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Tipus` (`id`, `nom_tipus`, `createdAt`, `updatedAt`) VALUES
(1,	'Hardware',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(2,	'Software',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(3,	'Xarxa',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(4,	'Impressió',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(5,	'Seguretat',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(6,	'Configuració',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(7,	'Actualització',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(8,	'Manteniment',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(9,	'Suport tècnic',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59'),
(10,	'Altres',	'2025-05-13 07:31:59',	'2025-05-13 07:31:59');

-- 2025-05-13 10:13:12
