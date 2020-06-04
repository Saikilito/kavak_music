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
const helpers_1 = require("../helpers");
class RenderController {
    constructor() {
        this.home = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT a.id as 'id', a.title, a.genre, u.countrycode
            FROM albums a 
            JOIN users u ON a.userid = u.id
            WHERE a.genre = "ROCK" 
            AND u.countrycode = "PE"
        `;
            const albumsPeru = yield helpers_1.querys.useQuery(query);
            res.render('index', { albumsPeru });
        });
        this.users = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield helpers_1.querys.findAll('users');
            return res.render('users', {
                users
            });
        });
        this.addUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM country`;
            const country = yield helpers_1.querys.useQuery(query);
            return res.render('addUser', { country });
        });
        this.editUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const queryUser = `SELECT * FROM users WHERE id = ?`;
            let user = yield helpers_1.querys.useQuery(queryUser, [id]);
            user = user[0];
            const queryCountry = `SELECT * FROM country`;
            const country = yield helpers_1.querys.useQuery(queryCountry);
            return res.render('editUser', { user, country });
        });
        this.tracks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { page } = req.params;
            const currentPage = parseInt(page);
            const showTracks = 5;
            const query = `
            SELECT t.id as id, t.title as 'track_title', t.artist as artist, t.genre as genre, a.title as 'album_title', u.name as 'user_name', u.email as 'email'
            FROM tracks t
            JOIN albums a ON a.id = t.albumid
            JOIN users u  ON a.userid = u.id
            GROUP BY t.title
            LIMIT ?,?
        `;
            const data = yield helpers_1.querys.useQuery(query, [(currentPage - 1) * showTracks, showTracks]);
            const queryCount = `SELECT COUNT(id) as total_tracks FROM tracks`;
            const response = yield helpers_1.querys.useQuery(queryCount);
            console.log("response", response);
            const total_page = Math.ceil(parseInt(response[0].total_tracks) / showTracks);
            let arrayPage = [];
            for (let i = 0; i <= total_page; i++) {
                arrayPage.push(i);
            }
            return res.render('tracks', {
                data,
                arrayPage,
                currentPage,
                total_page
            });
        });
        this.addTrack = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const queryUser = `SELECT * FROM users`;
            const users = yield helpers_1.querys.useQuery(queryUser);
            const queryAlbums = `SELECT * FROM albums`;
            const albums = yield helpers_1.querys.useQuery(queryAlbums);
            return res.render('addTrack', {
                users,
                albums
            });
        });
        this.albums = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { filter, sort } = req.query;
            const [column, search] = filter ? filter.toString().split('-') : ['id', '*'];
            let query = `
            SELECT * FROM albums 
            ${filter ? `WHERE ${column.toString()} LIKE '${search.toString()}'` : ""}            
            ORDER BY ${sort ? sort.toString() : "id"} ASC
        `;
            const response = yield helpers_1.querys.useQuery(query);
            return res.render('albums', {
                albums: response
            });
        });
        this.album = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = `
            SELECT t.id as 'track_id', t.title as 'track_title', t.genre as 'track_genre'
            FROM tracks t
            JOIN albums a ON a.id = t.albumid            
            WHERE a.id = ?
            GROUP BY t.title
        `;
            const album = yield helpers_1.querys.findOne("albums", [parseInt(id)]);
            const data = yield helpers_1.querys.useQuery(query, [parseInt(id)]);
            return res.render('album', {
                album,
                data
            });
        });
        this.addAlbum = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield helpers_1.querys.useQuery('SELECT name,id FROM users');
            return res.render('addAlbum', { users });
        });
    }
}
const render = new RenderController();
exports.default = render;
