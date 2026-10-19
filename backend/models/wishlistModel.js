const { sql, getPool } = require("../config/db");

const wishlistColumns = "entryID, itemName, quantity, category";

const getAll = async () => {
  const pool = await getPool();
  const result = await pool
    .request()
    .query(`SELECT ${wishlistColumns} FROM wishlist`);
  return result.recordset;
};

const create = async ({ itemName, quantity, category }) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("itemName", sql.NVarChar(100), itemName)
    .input("quantity", sql.Int, quantity)
    .input("category", sql.NVarChar(50), category)
    .query(`INSERT INTO wishlist (itemName, quantity, category)
              OUTPUT INSERTED.entryID
              VALUES (@itemName, @quantity, @category)`);
  return result.recordset[0];
};

const update = async ({ entryID, itemName, quantity, category }) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("entryID", sql.Int, entryID)
    .input("itemName", sql.NVarChar(100), itemName)
    .input("quantity", sql.Int, quantity)
    .input("category", sql.NVarChar(50), category)
    .query(`UPDATE wishlist SET itemName = @itemName, quantity = @quantity, category=@category
            WHERE entryID = @entryID`);
  return result.recordset[0];
};

const remove = async (id) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("entryID", sql.Int, id)
    .query("DELETE FROM wishlist WHERE entryID = @id");
  return result.rowsAffected[0] > 0;
};

module.exports = {
  create,
  getAll,
  update,
  remove,
};
