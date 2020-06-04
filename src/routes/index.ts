import {
  Router,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
const api = Router();

import user_routes from "./user.route";
import album_routes from "./album.route";
import track_routes from "./track.route";
import country_routes from "./country.route";

import render_routes from './render.route';

api.use("/api/v1/user", user_routes);
api.use("/api/v1/album", album_routes);
api.use("/api/v1/track", track_routes);
api.use("/api/v1/country", country_routes);

api.use(render_routes);

api.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error('run handle error', err);
    res.status(500).json({
      ok: false,
      error: err,
    });
  }
);



export default api;
