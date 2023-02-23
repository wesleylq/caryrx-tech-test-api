import mysql from "mysql";
import "dotenv/config"

function createDatabase() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  });

  return {
    query(sql: any, args: any) {
      return new Promise((resolve, reject) => {
        connection.query(sql, args, (error, rows) => {
          if (error) {
            return reject(error);
          }
          resolve(rows);
        });
      });
    }
  }
}

export default createDatabase()