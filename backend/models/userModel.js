// Models = all SQL lives here. Always use .input() (parameters) to prevent SQL injection.
const { sql, getPool } = require("../config/db");

const PUBLIC_COLUMNS = "userID, firstName, lastName, email, userRole,createdAt"; // never return PasswordHash

const getAll = async () => {
  const pool = await getPool();
  const result = await pool
    .request()
    .query(`SELECT ${PUBLIC_COLUMNS} FROM users`);
  return result.recordset;
};

const findById = async (id) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("userID", sql.Int, id)
    .query(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE userID = @id`);
  return result.recordset[0];
};

// Includes PasswordHash: only used by login
const findByEmail = async (email) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .query(
      "SELECT userID, firstName, lastName, email, userRole, userPassword, createdAt FROM users WHERE email = @email",
    );
  return result.recordset[0];
};

const create = async ({
  firstName,
  lastName,
  email,
  passwordHash,
  role = "u",
}) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("firstName", sql.NVarChar(100), firstName)
    .input("lastName", sql.NVarChar(100), lastName)
    .input("email", sql.NVarChar(255), email)
    .input("passwordHash", sql.NVarChar(255), passwordHash)
    .input("role", sql.NVarChar(20), role)
    .query(`INSERT INTO users (firstName, lastName, email, userPassword, userRole,createdAt)
            OUTPUT INSERTED.userID, INSERTED.firstName,INSERTED.lastName, INSERTED.email, INSERTED.userRole, INSERTED.createdAt
            VALUES (@firstName, @lastName, @email, @passwordHash, @role, GETDATE())`);
  return result.recordset[0];
};

const update = async (
  id,
  { firstName, lastName, email, passwordHash, location, number },
) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("userID", sql.Int, id)
    .input("firstName", sql.NVarChar(100), firstName)
    .input("lastName", sql.NVarChar(100), lastName)
    .input("userPassword", sql.NVarChar(255), passwordHash)
    .input("email", sql.NVarChar(255), email)
    .input("location", sql.NVarChar(255), location)
    .input("number", sql.NVarChar(10), number)
    .query(`UPDATE users SET firstName = @firstName, lastName = @lastName, email = @email, userPassword = @passwordHash, location = @location, number = @number
            OUTPUT INSERTED.userID, INSERTED.firstName,INSERTED.lastName, INSERTED.email, INSERTED.userRole, INSERTED.location, INSERTED.number
            WHERE userID = @id`);
  return result.recordset[0];
};

const remove = async (id) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("userID", sql.Int, id)
    .query("DELETE FROM users WHERE userID = @id");
  return result.rowsAffected[0] > 0;
};

module.exports = { getAll, findById, findByEmail, create, update, remove };
