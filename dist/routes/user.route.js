"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes = express_1.Router();
const controllers_1 = require("../controllers");
user_routes.get("/all", controllers_1.UserController.getAll);
user_routes.get("/:id", controllers_1.UserController.getOne);
user_routes.post("/add", controllers_1.UserController.create);
user_routes.put("/update/:id", controllers_1.UserController.update);
user_routes.delete("/delete/:id", controllers_1.UserController.delete);
//--
user_routes.put("/standardize", controllers_1.UserController.standardizeUserWithoutMusic);
exports.default = user_routes;
