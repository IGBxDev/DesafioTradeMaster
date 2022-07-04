"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntertainment = exports.getAllEntertainment = void 0;
const EntertainmentServices_1 = require("../../core/services/EntertainmentServices");
const getAllEntertainment = (req, res) => {
    const payload = {
        Name: req.body.Name,
        EntertainmentType_Id: req.body.EntertainmentType_Id
    };
    try {
        (0, EntertainmentServices_1.create)(payload);
    }
    catch (error) {
    }
    res.status(200).send({ Id: 1, Name: 'Spider Man', Type: 1 });
};
exports.getAllEntertainment = getAllEntertainment;
const createEntertainment = (req, res) => {
    const { name, type } = req.body;
};
exports.createEntertainment = createEntertainment;
