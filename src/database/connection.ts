import knex from "knex";
import  dotenv from 'dotenv';

dotenv.config();

export const connection = knex({    
    client: "mysql",
    // connection: {
    //     host: '127.0.0.1', //process.env.DB_HOST,
    //     port: 3306,
    //     user: 'tradeMaster', //process.env.DB_USER,
    //     password: 'tradeMaster2022', //process.env.DB_PASS,
    //     database: 'desafiotrademaste', //process.env.DB_SCHEMA,
    //     multipleStatements: true
    // }
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
        multipleStatements: true
     }
     
})