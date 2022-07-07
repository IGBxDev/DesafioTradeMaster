"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.validadeOrder = exports.validateQuery = exports.validateBody = void 0;
const Yup = __importStar(require("yup"));
const schemaBody = Yup.object().shape({
    name: Yup.string().required().typeError("Necessário informar um nome"),
    entertainmentType_Id: Yup.number().required().typeError("Necessário infromar um Id para entertainmentType_Id")
});
const schemaQuery = Yup.object().shape({
    name: Yup.string(),
    type: Yup.string(),
});
const schemaOrder = Yup.object().shape({
    entertainment_Id: Yup.number().required().typeError("Necessário informar entertainment_Id"),
    entertainmentStatus_Id: Yup.number().required().typeError("Necessário informar entertainmentStatus_Id"),
    rentDays: Yup.number().required().typeError("Necessário informar rentDays"),
    user: Yup.string().required().typeError("Necessário informar user"),
    datePrevision: Yup.date().required()
});
const validateBody = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaBody.validate(payload);
    return result;
});
exports.validateBody = validateBody;
const validateQuery = (name, type) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaQuery.validate({
        name: name,
        type: type
    }, { abortEarly: false }).then(() => {
        if (name === "" && type === "") {
            throw new Error("Necessário informar um nome ou um tipo");
        }
    });
    return result;
});
exports.validateQuery = validateQuery;
const validadeOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schemaOrder.validate(payload);
    return result;
});
exports.validadeOrder = validadeOrder;
