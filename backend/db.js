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

const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to Azure SQL Database successfully!");
    return pool;
  } catch (err) {
    console.error("Database connection failed: ", err);
    process.exit(1);
  }
};

module.exports = { sql, connectDB };
