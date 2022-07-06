"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./../connection");
const types_json_1 = __importDefault(require("../migrations/types.json"));
const Status_json_1 = __importDefault(require("../migrations/Status.json"));
const printError = (error) => { console.log(error.sqlMessage || error.message); };
const createTables = () => connection_1.connection.raw(`
    CREATE TABLE IF NOT EXISTS EntertainmentStatus (
        id INT PRIMARY KEY AUTO_INCREMENT,
        description VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL DEFAULT(1)
    );

    CREATE TABLE IF NOT EXISTS EntertainmentType (
        id INT PRIMARY KEY AUTO_INCREMENT,
        description VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL DEFAULT(1)
    );

    CREATE TABLE IF NOT EXISTS Entertainment (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        entertainmentType_Id INT,
        active INT NOT NULL DEFAULT(1),
        FOREIGN KEY(entertainmentType_Id) REFERENCES EntertainmentType(id)
    );


    CREATE TABLE IF NOT EXISTS EntertainmentOrder (
        id INT PRIMARY KEY AUTO_INCREMENT,
        entertainment_Id INT NOT NULL,
        entertainmentStatus_Id INT NOT NULL,
        rentDays INT NOT NULL DEFAULT(0),
        user VARCHAR(255),
        datePrevision DATETIME,
        active INT NOT NULL DEFAULT(1),
        FOREIGN KEY (entertainment_Id) REFERENCES Entertainment(id),
        FOREIGN KEY (entertainmentStatus_Id) REFERENCES EntertainmentStatus(id)
    );
`)
    .then(() => { console.log(`Tabelas criada com suceso`); })
    .catch(printError);
const insertEntertainmentType = () => (0, connection_1.connection)('EntertainmentType')
    .insert(types_json_1.default)
    .then(() => { console.log("EntertainmentType insert ok"); })
    .catch(printError);
const insertEntertainmentStatus = () => (0, connection_1.connection)('EntertainmentStatus')
    .insert(Status_json_1.default)
    .then(() => { console.log("EntertainmentStatus insert ok"); })
    .catch(printError);
const closeConnection = () => { connection_1.connection.destroy(); };
createTables()
    .then(insertEntertainmentType)
    .then(insertEntertainmentStatus)
    .finally(closeConnection);
