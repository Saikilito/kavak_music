import { Router } from "express";
const track_routes = Router();

import { TrackController as track } from "../controllers";


track_routes.post("/add", track.create);

track_routes.get("/all", track.getAll);

track_routes.get("/:id", track.getOne);

track_routes.put("/update/:id", track.update);

track_routes.delete("/delete/:id", track.delete);

//--

track_routes.put("/standardize", track.standardizeTrackWithoutArtist);

export default track_routes;