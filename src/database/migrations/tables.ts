import { connection } from "./../connection";
import EntertainmentTypes from "../migrations/types.json";
import EntertainmentStatus from "../migrations/Status.json";

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection.raw(`
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
.then(()=>{console.log(`Tabelas criada com suceso`)})
.catch(printError)

const insertEntertainmentType = () => connection('EntertainmentType')
.insert(EntertainmentTypes)
.then(() => { console.log("EntertainmentType insert ok") })
.catch(printError)

const insertEntertainmentStatus = () => connection('EntertainmentStatus')
.insert(EntertainmentStatus)
.then(() => { console.log("EntertainmentStatus insert ok") })
.catch(printError)

const closeConnection = () =>{ connection.destroy() }

createTables()
.then(insertEntertainmentType)
.then(insertEntertainmentStatus)
.finally(closeConnection)