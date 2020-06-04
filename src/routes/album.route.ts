import { Router } from "express";
const album_routes = Router();

import { AlbumController as album } from "../controllers";

album_routes.get("/all", album.getAll);

album_routes.get("/:id", album.getOne);

album_routes.post("/add", album.create);

album_routes.put("/update/:id", album.update);

album_routes.delete("/delete/:id", album.delete);

//--

album_routes.put("/standardize", album.standardizeAlbumsWithoutTrack);


export default album_routes;