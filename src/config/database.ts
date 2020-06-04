import { createPool } from "mysql2/promise";

const connection = () => {
  try {
    const connection = createPool({
      host: process.env.HOST_DB || "localhost",
      user: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB || "bquate_test_musica_2",
      waitForConnections: true,
    });
    return connection; 
  } catch (error) {
    console.error(error)
    throw new Error('Error in the database connection');
    
  }  
};

export default connection;