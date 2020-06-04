import { Request, Response, NextFunction } from "express";
import connection from "../config/database";

class CRUD {
  public entityName: String;

  constructor(entityName: String) {
    this.entityName = entityName;
  }
  useQuery = async (query: string, data?: Object[]): Promise<any> => {
    try {
      let response: Array<any>;
      if (data) {
        response = await connection().query(query, data);
      } else {
        response = await connection().query(query);
      }
      await connection().end();
      return response[0];
    } catch (error) {
      throw error;
    }
  };
  getAll = async (req: Request, res: Response): Promise<Response> => {
    const { filter, paginate, sort } = req.query;
    const pointer: Number = paginate ? Number(paginate) : 0;
    const [column, search] = filter ? filter.toString().split('-') : ['id', '*'];
    const query = `SELECT * FROM ${this.entityName} ${
      filter
        ? "WHERE '" +
        column.toString() +
        " LIKE %" +
        search.toString() + "%'"
        : ""
      } ORDER BY ${sort ? sort.toString() : "id"} ASC ${
        pointer > 0 ? " LIMIT " + pointer.toString() + "OFFSET 6": ""
      }`;

    console.error(query)
    const response = await this.useQuery(query);

    return res.json(response);
  };
  getOne = async (req: Request, res: Response, next:NextFunction): Promise<Response> => {
    const query: string = `SELECT * FROM ${this.entityName} WHERE id = ?`;
    const id: string = req.params.id;
    const response: Array<Object> = await this.useQuery(query, [id]);

    if (!response || response.length === 0) {
      return res.status(404).json({
        ok: false,
        message: `${this.entityName} not found`,
      });
    }

    return res.json(response[0]);
  };
  create = async (req: Request, res: Response, next:NextFunction): Promise<any> => {        
    try {
      const query: string = `INSERT INTO ${this.entityName} SET ?`;
      const data: any = req.body;
      const response = await this.useQuery(query, [data]);

      return res.json({ ok: true, response }); 

    } catch (error) {
      next(error);
    }
  };
  update = async (req: Request, res: Response, next:NextFunction): Promise<Response> => {
    const queryForFind: string = `SELECT * FROM ${this.entityName} WHERE id = ?`;
    const id: string = req.params.id;
    const dataFinded: Array<Object> = await this.useQuery(queryForFind, [id]);

    if (!dataFinded) {
      return res.status(404).json({
        ok: false,
        message: `${this.entityName} not found`,
      });
    }

    const query: string = `UPDATE ${this.entityName} SET ? WHERE id = ? `;
    const newData: Object = {
      ...dataFinded[0],
      ...req.body,
    };

    const response = await this.useQuery(query, [newData, id]);
    return res.json(response);
  };
  delete = async (req: Request, res: Response, next:NextFunction): Promise<Response> => {
    const query: string = `DELETE FROM ${this.entityName} WHERE id = ?`;
    const id: string = req.params.id;
    const response = await this.useQuery(query, [id]);

    if (response.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: `${this.entityName} not found`,
      });
    }

    return res.json({ ok: true, response });
  };
}

export default CRUD;
