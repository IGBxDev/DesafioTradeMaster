"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./../connection");
const printError = (error) => { console.log(error.sqlMessage || error.message); };
const createTables = () => connection_1.connection.raw(`
    CREATE TABLE IF NOT EXISTS EntertainmentStatus (
        Id INT PRIMARY KEY AUTO_INCREMENT,
        Description VARCHAR(255) NOT NULL,
        Active BOOLEAN NOT NULL DEFAULT(1)
    );


    CREATE TABLE IF NOT EXISTS EntertainmentType (
        Id INT PRIMARY KEY AUTO_INCREMENT,
        Description VARCHAR(255) NOT NULL,
        Active BOOLEAN NOT NULL DEFAULT(1)
    );

    CREATE TABLE IF NOT EXISTS Entertainment (
        Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Name VARCHAR(255) NOT NULL,
        EntertainmentType_Id INT,
        FOREIGN KEY(EntertainmentType_Id) REFERENCES EntertainmentType(Id)
    );


    CREATE TABLE IF NOT EXISTS EntertainmentOrder (
        Id INT PRIMARY KEY AUTO_INCREMENT,
        Entertainment_id INT NOT NULL,
        EntertainmentType_Id INT NOT NULL,
        RentDays INT NOT NULL DEFAULT(0),
        FOREIGN KEY (Entertainment_id) REFERENCES Entertainment(Id),
        FOREIGN KEY (EntertainmentType_Id) REFERENCES EntertainmentType(Id)
    );
`)
    .then(() => { console.log(`Tabelas criada com suceso`); })
    .catch(printError);
const closeConnection = () => { connection_1.connection.destroy(); };
createTables()
    .finally(closeConnection);
