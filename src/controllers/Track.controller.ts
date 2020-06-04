import { Request, Response, NextFunction } from "express";
import CRUD from "./CRUD";

class TrackController extends CRUD {
    public standardizeTrackWithoutArtist = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {      
            const queryUpdateTracksWithoutAritst = `
                UPDATE tracks t
                JOIN users u
                ON t.userid = u.id
                SET t.artist = u.name
                WHERE t.artist is NULL
                OR t.artist = ''
            `;

            const response = await this.useQuery(queryUpdateTracksWithoutAritst);            

            return res.json({
                ok: true,
                response
            });

        } catch (error) {
            next(error);
        }
    }
}

const track = new TrackController("tracks");

export default track;