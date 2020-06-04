import {
    Router,
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from "express";

import {RenderController as render} from '../controllers';
const render_routes = Router();

render_routes.get("/home", render.home);
render_routes.get("/albums/add", render.addAlbum);
render_routes.get("/albums/:id", render.album);
render_routes.get("/albums", render.albums);
render_routes.get("/tracks/add", render.addTrack);
render_routes.get("/tracks/:page", render.tracks);
render_routes.get("/tracks",(req: Request, res: Response)=>res.redirect('/tracks/1'));
render_routes.get("/settings",(req: Request, res: Response) => res.render('settings'));
render_routes.get("/users/add", render.addUser);
render_routes.get("/users/edit/:id", render.editUser);
render_routes.get("/users", render.users);
render_routes.get("/", (req: Request, res: Response) => res.redirect('/home'));
// 404
render_routes.get("*", (req: Request, res: Response) => res.render('404'));


export default render_routes;