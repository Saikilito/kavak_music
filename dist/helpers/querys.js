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
const database_1 = __importDefault(require("../config/database"));
const useQuery = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response;
        if (data && data.length > 0) {
            response = yield database_1.default().query(query, data);
        }
        else {
            response = yield database_1.default().query(query);
        }
        return response[0];
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    useQuery: useQuery,
    findAll: (table) => __awaiter(void 0, void 0, void 0, function* () {
        const query = `SELECT * FROM ${table}`;
        return yield useQuery(query);
    }),
    findOne: (table, id) => __awaiter(void 0, void 0, void 0, function* () {
        const query = `SELECT * FROM ${table} WHERE id = ?`;
        const one = yield useQuery(query, id);
        return one[0];
    }),
    save: (table, data) => __awaiter(void 0, void 0, void 0, function* () {
        const query = `INSERT INTO ${table} SET ?`;
        return yield useQuery(query, data);
    })
};
