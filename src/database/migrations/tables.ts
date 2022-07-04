import { connection } from "./../connection";

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
        FOREIGN KEY(entertainmentType_Id) REFERENCES EntertainmentType(id)
    );


    CREATE TABLE IF NOT EXISTS EntertainmentOrder (
        id INT PRIMARY KEY AUTO_INCREMENT,
        entertainment_Id INT NOT NULL,
        entertainmentType_Id INT NOT NULL,
        rentDays INT NOT NULL DEFAULT(0),
        FOREIGN KEY (entertainment_Id) REFERENCES Entertainment(id),
        FOREIGN KEY (entertainmentType_Id) REFERENCES EntertainmentType(id)
    );
`)
.then(()=>{console.log(`Tabelas criada com suceso`)})
.catch(printError)

const closeConnection = () =>{ connection.destroy() }

createTables()
.finally(closeConnection)