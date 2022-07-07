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
exports.deleteItem = exports.edit = exports.createOrderRentOrSaler = exports.findByQuery = exports.create = exports.all = void 0;
const connection_1 = require("../../database/connection");
const EntertainmentValidation_1 = require("../validation/EntertainmentValidation");
const moment_1 = __importDefault(require("moment"));
const all = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, connection_1.connection)('Entertainment')
            .select("*")
            .where("active", "=", "1");
    }
    catch (error) {
        return error;
    }
});
exports.all = all;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date;
    let result;
    try {
        result = yield (0, EntertainmentValidation_1.validateBody)(payload);
        if (result.errors) {
            throw new Error(result.message);
        }
        const insert = {
            entertainmentType_Id: payload.entertainmentType_Id,
            name: payload.name
        };
        const resultInsert = yield (0, connection_1.connection)('Entertainment').insert(insert);
        const payloadOrder = {
            entertainment_Id: resultInsert[0],
            entertainmentStatus_Id: payload.entertainmentStatus_Id,
            rentDays: payload.entertainmentStatus_Id === 1 ? payload.rentDays : 0,
            user: payload.user,
            datePrevision: dateNow,
            name: payload.name
        };
        result = yield (0, exports.createOrderRentOrSaler)(payloadOrder);
        if (result.errors) {
            throw new Error(result.message);
        }
        if (result.message) {
            throw new Error(result.message);
        }
        return resultInsert;
    }
    catch (error) {
        return error;
    }
});
exports.create = create;
const findByQuery = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        result = yield (0, EntertainmentValidation_1.validateQuery)(payload.name, payload.type);
        if (payload.name && payload.type) {
            result =
                (0, connection_1.connection)("Entertainment")
                    .select("Entertainment.id AS Id", "Entertainment.name AS Titulo", "EntertainmentType.description AS Type")
                    .innerJoin("EntertainmentType", "EntertainmentType.id", "=", "entertainmentType_Id")
                    .where('Entertainment.name', 'like', `%${payload.name}%`)
                    .orWhere("EntertainmentType.description", "like", `%${payload.type}%`);
        }
        if (payload.name && !payload.type) {
            result =
                (0, connection_1.connection)("Entertainment")
                    .select("Entertainment.id AS Id", "Entertainment.name AS Titulo", "EntertainmentType.description AS Type")
                    .innerJoin("EntertainmentType", "EntertainmentType.id", "=", "entertainmentType_Id")
                    .where('Entertainment.name', 'like', `%${payload.name}%`);
        }
        if (!payload.name && payload.type) {
            result =
                (0, connection_1.connection)("Entertainment")
                    .select("Entertainment.id AS Id", "Entertainment.name AS Titulo", "EntertainmentType.description AS Type")
                    .innerJoin("EntertainmentType", "EntertainmentType.id", "=", "entertainmentType_Id")
                    .where("EntertainmentType.description", "like", `%${payload.type}%`);
        }
        return result;
    }
    catch (error) {
        return error;
    }
});
exports.findByQuery = findByQuery;
const createOrderRentOrSaler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, EntertainmentValidation_1.validadeOrder)(payload);
        if (result.errors) {
            throw new Error(result.errors.message);
        }
        payload.datePrevision = validaDataPrevision(payload.entertainmentStatus_Id, payload.rentDays, payload.datePrevision);
        return yield (0, connection_1.connection)('EntertainmentOrder').insert(payload);
    }
    catch (error) {
        return error;
    }
});
exports.createOrderRentOrSaler = createOrderRentOrSaler;
const edit = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        result = yield (0, connection_1.connection)('EntertainmentOrder')
            .update({
            entertainment_Id: payload.entertainment_Id,
            entertainmentStatus_Id: payload.entertainmentStatus_Id,
            rentDays: payload.rentDays,
            user: payload.user,
            datePrevision: validaDataPrevision(payload.entertainmentStatus_Id, payload.rentDays, payload.datePrevision)
        })
            .where("id", id);
        if (result.erros) {
            throw new ErrorEvent(result.message);
        }
        if (result.message) {
            throw new ErrorEvent(result.message);
        }
        result = yield (0, connection_1.connection)('Entertainment')
            .update({ name: payload.name })
            .where("id", payload.entertainment_Id);
        if (result.erros) {
            throw new ErrorEvent(result.message);
        }
        if (result.message) {
            throw new ErrorEvent(result.message);
        }
        return result;
    }
    catch (error) {
        return error;
    }
});
exports.edit = edit;
const deleteItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connection_1.connection)('EntertainmentOrder')
            .update({
            active: 0
        })
            .where("id", id);
        return result;
    }
    catch (error) {
        return error;
    }
});
exports.deleteItem = deleteItem;
const validaDataPrevision = (entertainmentStatus_Id, rentDays, datePrevision) => {
    //Quando for aluguel é necessário informar a quantidade de dias maior que 0.
    if (entertainmentStatus_Id === 1) {
        if (rentDays === 0) {
            throw new Error("Necessário informar a quantidade de dias");
        }
        if (rentDays > 0) {
            datePrevision = (0, moment_1.default)(datePrevision, 'DD/MM/YYYY').add(rentDays, 'd').format('YYYY/MM/DD');
        }
    }
    if (rentDays === 0) {
        datePrevision = (0, moment_1.default)(datePrevision, 'DD/MM/YYYY').format('YYYY/MM/DD');
    }
    return datePrevision;
};
