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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrderSaler = void 0;
const connection_1 = require("../../database/connection");
exports.getAllOrderSaler = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield connection_1.connection('Entertainment as ent')
            .select("ent.id as Entertainment_Id", "ent.name as Entertainment_Titulo", "entT.id as EntertainmentType_Id", "entT.description as EntertainmentType_Description", "entS.id as EntertainmentStatus_Id", "entS.description as EntertainmentStatus_Description")
            .innerJoin("EntertainmentType as entT", "entT.id", "=", "ent.entertainmentType_Id")
            .innerJoin("EntertainmentOrder as entO", "entO.entertainment_Id", "=", "ent.Id")
            .innerJoin("EntertainmentStatus as entS", "entS.id", "=", "entO.entertainmentStatus_Id")
            .where("ent.active", "=", "1")
            .andWhere("entT.active", "=", "1")
            .andWhere("entO.active", "=", "1")
            .andWhere("entS.active", "=", "1");
    }
    catch (error) {
        return error;
    }
});
