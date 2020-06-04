"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const track_routes = express_1.Router();
const controllers_1 = require("../controllers");
track_routes.post("/add", controllers_1.TrackController.create);
track_routes.get("/all", controllers_1.TrackController.getAll);
track_routes.get("/:id", controllers_1.TrackController.getOne);
track_routes.put("/update/:id", controllers_1.TrackController.update);
track_routes.delete("/delete/:id", controllers_1.TrackController.delete);
//--
track_routes.put("/standardize", controllers_1.TrackController.standardizeTrackWithoutArtist);
exports.default = track_routes;
