"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.connection = knex_1.default({
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
});
