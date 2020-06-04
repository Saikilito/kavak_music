import { Router } from "express";
const country_routes = Router();

import { CountryController as country } from "../controllers";

country_routes.get("/all", country.getAll);

country_routes.get("/:id", country.getOne);

country_routes.post("/add", country.create);

country_routes.put("/update/:id", country.update);

country_routes.delete("/delete/:id", country.delete);

export default country_routes;