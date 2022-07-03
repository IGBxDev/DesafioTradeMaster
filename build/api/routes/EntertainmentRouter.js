"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntertainmentController_1 = require("../controller/EntertainmentController");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.get('/all', EntertainmentController_1.getAllEntertainment);
routes.post('/create', EntertainmentController_1.createEntertainment);
exports.default = routes;
