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
class CRUD {
    constructor(entityName) {
        this.useQuery = (query, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response;
                if (data) {
                    response = yield database_1.default().query(query, data);
                }
                else {
                    response = yield database_1.default().query(query);
                }
                database_1.default().end();
                return response[0];
            }
            catch (error) {
                throw error;
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { filter, paginate, sort } = req.query;
            const pointer = paginate ? Number(paginate) : 0;
            const [column, search] = filter ? filter.toString().split('-') : ['id', '*'];
            const query = `SELECT * FROM ${this.entityName} ${filter
                ? "WHERE '" +
                    column.toString() +
                    " LIKE %" +
                    search.toString() + "%'"
                : ""} ORDER BY ${sort ? sort.toString() : "id"} ASC ${pointer > 0 ? " LIMIT " + pointer.toString() + "OFFSET 6" : ""}`;
            console.error(query);
            const response = yield this.useQuery(query);
            return res.json(response);
        });
        this.getOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${this.entityName} WHERE id = ?`;
            const id = req.params.id;
            const response = yield this.useQuery(query, [id]);
            if (!response || response.length === 0) {
                return res.status(404).json({
                    ok: false,
                    message: `${this.entityName} not found`,
                });
            }
            return res.json(response[0]);
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO ${this.entityName} SET ?`;
                const data = req.body;
                const response = yield this.useQuery(query, [data]);
                return res.json({ ok: true, response });
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const queryForFind = `SELECT * FROM ${this.entityName} WHERE id = ?`;
            const id = req.params.id;
            const dataFinded = yield this.useQuery(queryForFind, [id]);
            if (!dataFinded) {
                return res.status(404).json({
                    ok: false,
                    message: `${this.entityName} not found`,
                });
            }
            const query = `UPDATE ${this.entityName} SET ? WHERE id = ? `;
            const newData = Object.assign(Object.assign({}, dataFinded[0]), req.body);
            const response = yield this.useQuery(query, [newData, id]);
            return res.json(response);
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM ${this.entityName} WHERE id = ?`;
            const id = req.params.id;
            const response = yield this.useQuery(query, [id]);
            if (response.affectedRows === 0) {
                return res.status(404).json({
                    ok: false,
                    message: `${this.entityName} not found`,
                });
            }
            return res.json({ ok: true, response });
        });
        this.entityName = entityName;
    }
}
exports.default = CRUD;
