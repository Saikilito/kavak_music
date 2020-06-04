import { Request, Response, NextFunction } from "express";
import CRUD from "./CRUD";

class AlbumController extends CRUD {  
    public standardizeAlbumsWithoutTrack = async (req: Request, res: Response, next: NextFunction): Promise<any> =>{
        try {
            const queryUpdateTracksWithoutAritst = `
                UPDATE albums a
                RIGHT JOIN (
                    SELECT t.albumid as id, COUNT(t.albumid) as tracks 
                    FROM tracks t                
                    GROUP BY t.albumid
                ) as c                
                ON c.id = a.id
                SET a.status = 0
                WHERE c.tracks = 0;
            `;
                        
            const tracksInAlbums = await this.useQuery(queryUpdateTracksWithoutAritst);

            return res.json({
                ok:true,
                response: tracksInAlbums
            });

        } catch (error) {
            next(error);
        }
    }
}

const album = new AlbumController("albums");

export default album;