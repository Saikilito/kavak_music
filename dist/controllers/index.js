"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderController = exports.CountryController = exports.TrackController = exports.AlbumController = exports.UserController = void 0;
const User_controller_1 = __importDefault(require("./User.controller"));
exports.UserController = User_controller_1.default;
const Album_controller_1 = __importDefault(require("./Album.controller"));
exports.AlbumController = Album_controller_1.default;
const Track_controller_1 = __importDefault(require("./Track.controller"));
exports.TrackController = Track_controller_1.default;
const Country_controller_1 = __importDefault(require("./Country.controller"));
exports.CountryController = Country_controller_1.default;
const Render_controller_1 = __importDefault(require("./Render.controller"));
exports.RenderController = Render_controller_1.default;
