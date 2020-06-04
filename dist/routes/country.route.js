"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_routes = express_1.Router();
const controllers_1 = require("../controllers");
country_routes.get("/all", controllers_1.CountryController.getAll);
country_routes.get("/:id", controllers_1.CountryController.getOne);
country_routes.post("/add", controllers_1.CountryController.create);
country_routes.put("/update/:id", controllers_1.CountryController.update);
country_routes.delete("/delete/:id", controllers_1.CountryController.delete);
exports.default = country_routes;