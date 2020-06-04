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
class AlbumController extends CRUD_1.default {
    constructor() {
        super(...arguments);
        this.standardizeAlbumsWithoutTrack = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryUpdateTracksWithoutAritst = `
                UPDATE albums a
                RIGHT JOIN (
                    SELECT t.albumid as id, COUNT(t.albumid) as tracks 
                    FROM tracks t                
                    GROUP BY t.albumid
                ) as c                
                ON c.id = a.id
                SET a.status = 0
                WHERE c.tracks = 0;
            `;
                const tracksInAlbums = yield this.useQuery(queryUpdateTracksWithoutAritst);
                return res.json({
                    ok: true,
                    response: tracksInAlbums
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
const album = new AlbumController("albums");
exports.default = album;
