"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntertainment = exports.getAllEntertainment = void 0;
const getAllEntertainment = (req, res) => {
    res.status(200).send({ Id: 1, Name: 'Spider Man', Type: 1 });
};
exports.getAllEntertainment = getAllEntertainment;
const createEntertainment = (req, res) => {
    const { name, type } = req.body;
};
exports.createEntertainment = createEntertainment;
