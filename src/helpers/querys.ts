import connection from "../config/database";

const useQuery = async (query:string, data?:Object[]) =>{
  try {
    let response: Array<any>;
    if (data && data.length > 0) {
      response = await connection().query(query, data);
    } else {
      response = await connection().query(query);
    }
    await connection().end();
    return response[0];
  } catch (error) {
    throw error;
  }
}

export default {
  useQuery:useQuery,
  findAll: async (table: string): Promise<Object[]> => {
    const query = `SELECT * FROM ${table}`;
    return await useQuery(query);     
  },
  findOne: async (table: string, id: Array<number>): Promise<Object> => {
    const query = `SELECT * FROM ${table} WHERE id = ?`;
    const one = await useQuery(query, id);
    return one[0];
  },
  save: async (table: string, data:Array<string>): Promise<Object> => {
    const query = `INSERT INTO ${table} SET ?`;
    return await useQuery(query, data);
  }
};
