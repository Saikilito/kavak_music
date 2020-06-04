"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api = express_1.Router();
const user_route_1 = __importDefault(require("./user.route"));
const album_route_1 = __importDefault(require("./album.route"));
const track_route_1 = __importDefault(require("./track.route"));
const country_route_1 = __importDefault(require("./country.route"));
const render_route_1 = __importDefault(require("./render.route"));
api.use("/api/v1/user", user_route_1.default);
api.use("/api/v1/album", album_route_1.default);
api.use("/api/v1/track", track_route_1.default);
api.use("/api/v1/country", country_route_1.default);
api.use(render_route_1.default);
api.use((err, req, res, next) => {
    console.error('run handle error', err);
    res.status(500).json({
        ok: false,
        error: err,
    });
});
exports.default = api;
