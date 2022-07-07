"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import swaggerUi from 'swagger-ui-express'
// import swaggerOptions from './swagger.json'
// import swaggerJsDoc  from 'swagger-jsdoc'
const cors_1 = __importDefault(require("cors"));
const EntertainmentRouter_1 = __importDefault(require("./api/routes/EntertainmentRouter"));
const EntertainmentTypesRouter_1 = __importDefault(require("./api/routes/EntertainmentTypesRouter"));
const EntertainmentStatusRouter_1 = __importDefault(require("./api/routes/EntertainmentStatusRouter"));
const EntertainmentOrderRouter_1 = __importDefault(require("./api/routes/EntertainmentOrderRouter"));
const SwaggerRouter_1 = __importDefault(require("./api/routes/SwaggerRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*", credentials: true })); //define que qualquer url pode acessar essa api
app.use('/', SwaggerRouter_1.default);
app.use('/entertainment', EntertainmentRouter_1.default);
app.use('/entertainmentTypes', EntertainmentTypesRouter_1.default);
app.use('/entertainmentStatus', EntertainmentStatusRouter_1.default);
app.use('/entertainmentOrder', EntertainmentOrderRouter_1.default);
exports.default = app;
