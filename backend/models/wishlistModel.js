const { sql, getPool } = require("../config/db");

const wishlistColumns =
  "w.entryID, w.itemName, w.quantity, w.category,w.isComplete";

const getAll = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT ${wishlistColumns},
           ISNULL(d.totalDonated, 0) AS donatedQuantity,
           CASE WHEN w.quantity - ISNULL(d.totalDonated, 0) < 0
                THEN 0
                ELSE w.quantity - ISNULL(d.totalDonated, 0)
           END AS stillNeeded
    FROM wishlist w
    LEFT JOIN (
      SELECT LTRIM(RTRIM(i.itemName)) AS itemName,
             SUM(i.quantity) AS totalDonated
      FROM items i
      INNER JOIN itemDonationLinks l ON l.itemID = i.itemID
      GROUP BY LTRIM(RTRIM(i.itemName))
    ) d ON d.itemName = LTRIM(RTRIM(w.itemName))
  `);
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
      OUTPUT INSERTED.*
            WHERE entryID = @entryID`);
  return result.recordset[0];
};

const CompleteItem = async ({ entryID }) => {
  const pool = await getPool();
  const result = await pool.request().input("entryID", sql.Int, entryID)
    .query(`UPDATE wishlist SET isComplete = 1
      OUTPUT INSERTED.*
            WHERE entryID = @entryID`);
  return result.recordset[0];
};

const remove = async ({ entryID }) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("entryID", sql.Int, entryID)
    .query("DELETE FROM wishlist WHERE entryID = @entryID");
  return result.rowsAffected[0] > 0;
};

module.exports = {
  create,
  getAll,
  update,
  remove,
  CompleteItem,
};
