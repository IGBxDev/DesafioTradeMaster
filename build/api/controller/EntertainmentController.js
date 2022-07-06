"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByQuery = exports.create = exports.all = exports.deleteOrder = exports.editOrder = exports.createOrder = void 0;
const EntertainmentServices_1 = require("../../core/services/EntertainmentServices");
const moment_1 = __importDefault(require("moment"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    moment_1.default.locale('pt-BR');
    const dateNow = new Date;
    try {
        const payload = {
            entertainment_Id: req.body.entertainment_Id,
            entertainmentStatus_Id: req.body.entertainmentStatus_Id,
            rentDays: req.body.rentDays,
            datePrevision: dateNow,
            user: req.body.user
        };
        const result = yield (0, EntertainmentServices_1.createOrderRentOrSaler)(payload);
        if (result.erros) {
            throw new Error(result.erros.message);
        }
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.createOrder = createOrder;
const editOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    moment_1.default.locale('pt-BR');
    const dateNow = new Date;
    const payload = {
        entertainment_Id: req.body.entertainment_Id,
        entertainmentStatus_Id: req.body.entertainmentStatus_Id,
        rentDays: req.body.rentDays,
        datePrevision: dateNow,
        user: req.body.user
    };
    try {
        const result = yield (0, EntertainmentServices_1.edit)(payload, id);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.editOrder = editOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield (0, EntertainmentServices_1.deleteItem)(id);
        res.status(200).send({ message: 'sucess' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteOrder = deleteOrder;
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, EntertainmentServices_1.all)();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.all = all;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            name: req.body.name,
            entertainmentType_Id: req.body.entertainmentType_Id,
            entertainmentStatus_Id: req.body.entertainmentStatus_Id,
            user: req.body.user
        };
        const result = yield (0, EntertainmentServices_1.create)(payload);
        if (result.errors) {
            throw new Error(result.message);
        }
        res.status(200).send({ description: 'OK', response: result });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.create = create;
const findByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            name: req.query.name,
            type: req.query.type
        };
        const result = yield (0, EntertainmentServices_1.findByQuery)(payload);
        if (result.message) {
            throw new Error(result.message);
        }
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.findByQuery = findByQuery;
