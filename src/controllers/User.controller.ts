import { Request, Response, NextFunction } from "express";
import CRUD from "./CRUD";

class UserController extends CRUD {
  public create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { name, email, countrycode, status } = req.body;

      const data: NewUser = {
        name,
        email,
        countrycode,
        status
      };

      //validate

      const createQuery: string = `INSERT INTO ${this.entityName} SET ?`;
      const response = await this.useQuery(createQuery, [data]);

      return res.json({ ok: true, response });

    } catch (error) {
      next(error);
    }
  };
  public standardizeUserWithoutMusic = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const query = `
        SELECT u.name, COUNT(t.userid), COUNT(a.userid)
        FROM users u 
        INNER JOIN tracks t ON u.id = t.userid
        INNER JOIN albums a ON u.id = a.userid
        GROUP BY u.name
      `;

      const response = await this.useQuery(query);

      return res.json({
        ok: true,
        response
      });

    } catch (error) {
      next(error);
    }
  }
}

const user = new UserController("users");

export default user;

type User = {
  id: number;
  name: string;
  email: string;
  countrycode: string;
  status: number;
};

type NewUser = {
  name: string;
  email: string;
  countrycode: string;
  status: number;
};