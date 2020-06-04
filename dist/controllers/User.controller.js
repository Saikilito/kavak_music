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
const CRUD_1 = __importDefault(require("./CRUD"));
class UserController extends CRUD_1.default {
    constructor() {
        super(...arguments);
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, countrycode, status } = req.body;
                const data = {
                    name,
                    email,
                    countrycode,
                    status
                };
                //validate
                const createQuery = `INSERT INTO ${this.entityName} SET ?`;
                const response = yield this.useQuery(createQuery, [data]);
                return res.json({ ok: true, response });
            }
            catch (error) {
                next(error);
            }
        });
        this.standardizeUserWithoutMusic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT u.name, COUNT(t.userid), COUNT(a.userid)
        FROM users u 
        INNER JOIN tracks t ON u.id = t.userid
        INNER JOIN albums a ON u.id = a.userid
        GROUP BY u.name
      `;
                const response = yield this.useQuery(query);
                return res.json({
                    ok: true,
                    response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
const user = new UserController("users");
exports.default = user;
