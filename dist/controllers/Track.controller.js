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
class TrackController extends CRUD_1.default {
    constructor() {
        super(...arguments);
        this.standardizeTrackWithoutArtist = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryUpdateTracksWithoutAritst = `
                UPDATE tracks t
                JOIN users u
                ON t.userid = u.id
                SET t.artist = u.name
                WHERE t.artist is NULL
                OR t.artist = ''
            `;
                const response = yield this.useQuery(queryUpdateTracksWithoutAritst);
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
const track = new TrackController("tracks");
exports.default = track;
