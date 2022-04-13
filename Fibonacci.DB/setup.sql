-- app_db.FibonacciNumbers definition
CREATE DATABASE app_db;

USE app_db;

CREATE TABLE `FibonacciNumbers` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `SequenceIndex` bigint(20) NOT NULL,
  `Number` bigint(20) NOT NULL,
  `RequestDate` datetime(6) NOT NULL,
  `CreationDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;