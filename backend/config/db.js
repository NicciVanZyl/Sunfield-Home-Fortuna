const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let poolPromise;

//This basically allows the calls to be made even when once fails.
// Instead of closing the connection when one fails it returns undefined and lets other connections try again
//  -> apparently better for errors because you don't have to restart the server
const getPool = () => {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then((pool) => {
        console.log("Connected to Azure SQL Database");
        return pool;
      })
      .catch((err) => {
        poolPromise = undefined;
        throw err;
      });
  }
  return poolPromise;
};

module.exports = { sql, getPool };
