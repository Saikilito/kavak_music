import { Response, Request, NextFunction } from 'express';
import { querys } from '../helpers';


class RenderController {
    public home = async (req: Request, res: Response, next: NextFunction) => {
        const query = `
            SELECT a.id as 'id', a.title, a.genre, u.countrycode
            FROM albums a 
            JOIN users u ON a.userid = u.id
            WHERE a.genre = "ROCK" 
            AND u.countrycode = "PE"
        `;

        const albumsPeru = await querys.useQuery(query);
        res.render('index', { albumsPeru });
    }
    public users = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const users = await querys.findAll('users');

        return res.render('users', {
            users
        });
    }
    public addUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const query = `SELECT * FROM country`;
        const country = await querys.useQuery(query);

        return res.render('addUser', { country });
    }
    public editUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { id } = req.params;
        const queryUser = `SELECT * FROM users WHERE id = ?`;
        let user = await querys.useQuery(queryUser, [id]);
        user = user[0];

        const queryCountry = `SELECT * FROM country`;
        const country = await querys.useQuery(queryCountry);

        return res.render('editUser', { user, country });
    }
    public tracks = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { page } = req.params;
        const currentPage = parseInt(page);
        const showTracks: number = 5;


        const query = `
            SELECT t.id as id, t.title as 'track_title', t.artist as artist, t.genre as genre, a.title as 'album_title', u.name as 'user_name', u.email as 'email'
            FROM tracks t
            JOIN albums a ON a.id = t.albumid
            JOIN users u  ON a.userid = u.id
            GROUP BY t.title
            LIMIT ?,?
        `;

        const data = await querys.useQuery(query, [(currentPage - 1) * showTracks, showTracks]);

        const queryCount = `SELECT COUNT(id) as total_tracks FROM tracks`;
        const response = await querys.useQuery(queryCount);
        console.log("response", response);
        const total_page = Math.ceil(parseInt(response[0].total_tracks) / showTracks)
        let arrayPage = [];

        for (let i = 0; i <= total_page; i++) {
            arrayPage.push(i)
        }

        return res.render('tracks', {
            data,
            arrayPage,
            currentPage,
            total_page
        });
    }

    public addTrack = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const queryUser = `SELECT * FROM users`;
        const users = await querys.useQuery(queryUser);

        const queryAlbums = `SELECT * FROM albums`;
        const albums = await querys.useQuery(queryAlbums);

        return res.render('addTrack', {
            users,
            albums
        });
    }
    public albums = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { filter, sort } = req.query;        
        const [column, search] = filter ? filter.toString().split('-') : ['id', '*'];
     
        let query = `
            SELECT * FROM albums 
            ${filter?`WHERE ${column.toString()} LIKE '${search.toString()}'`:""}            
            ORDER BY ${sort ? sort.toString() : "id"} ASC
        `;
        
        const response = await querys.useQuery(query);

        return res.render('albums', {
            albums: response
        });
    }
    public album = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { id } = req.params;

        const query = `
            SELECT t.id as 'track_id', t.title as 'track_title', t.genre as 'track_genre'
            FROM tracks t
            JOIN albums a ON a.id = t.albumid            
            WHERE a.id = ?
            GROUP BY t.title
        `;

        const album = await querys.findOne("albums", [parseInt(id)]);
        const data = await querys.useQuery(query, [parseInt(id)]);

        return res.render('album', {
            album,
            data
        });
    }
    public addAlbum = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const users = await querys.useQuery('SELECT name,id FROM users');

        return res.render('addAlbum', { users });
    }
}

const render = new RenderController();

export default render;