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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe('Teste Entertainment', () => {
    it('Should get the all entertainment', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/entertainment/all');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.arrayContaining([] || [{}]));
    }));
    it('Create entertainment', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/entertainment/create')
            .set('Content-type', 'application/json')
            .send({
            name: "Home Aranha 1",
            entertainmentType_Id: 1,
            entertainmentStatus_Id: 1,
            user: 'rafael jest',
            rentDays: 2
        });
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("description");
        expect(res.body).toHaveProperty("response");
        expect(res.body.response).toEqual(expect.arrayContaining([]));
    }));
});
