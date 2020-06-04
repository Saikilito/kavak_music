import { Router } from "express";
const user_routes = Router();

import { UserController as user } from "../controllers";

user_routes.get("/all", user.getAll);

user_routes.get("/:id", user.getOne);

user_routes.post("/add", user.create);

user_routes.put("/update/:id", user.update);

user_routes.delete("/delete/:id", user.delete);

//--

user_routes.put("/standardize", user.standardizeUserWithoutMusic);

export default user_routes;