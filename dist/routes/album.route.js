"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const album_routes = express_1.Router();
const controllers_1 = require("../controllers");
album_routes.get("/all", controllers_1.AlbumController.getAll);
album_routes.get("/:id", controllers_1.AlbumController.getOne);
album_routes.post("/add", controllers_1.AlbumController.create);
album_routes.put("/update/:id", controllers_1.AlbumController.update);
album_routes.delete("/delete/:id", controllers_1.AlbumController.delete);
//--
album_routes.put("/standardize", controllers_1.AlbumController.standardizeAlbumsWithoutTrack);
exports.default = album_routes;
