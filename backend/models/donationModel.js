const { sql, getPool } = require("../config/db");

const monetaryColumns = "monetaryDonationID, amount, donationDate, donor";
const itemColumns = "itemDonationID, totalItems, donationDate, donor";

const getAllMonetary = async () => {
  const pool = await getPool();
  const result = await pool
    .request()
    .query(
      `SELECT ${monetaryColumns} FROM monetaryDonations ORDER BY donationDate`,
    );
  return result.recordset;
};

const getAllItem = async () => {
  const pool = await getPool();
  const result = await pool
    .request()
    .query(`SELECT ${itemColumns} FROM itemDonations  ORDER BY donationDate`);
  return result.recordset;
};

const getAllItemWithItems = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT d.itemDonationID, d.totalItems, d.donationDate, d.donor,
           i.itemID, i.itemName, i.quantity, i.category, i.quality
    FROM itemDonations d
    LEFT JOIN itemDonationLinks l ON l.donationID = d.itemDonationID
    LEFT JOIN items i ON i.itemID = l.itemID
    ORDER BY d.donationDate`);

  const donations = {};
  for (const row of result.recordset) {
    if (!donations[row.itemDonationID]) {
      donations[row.itemDonationID] = {
        itemDonationID: row.itemDonationID,
        totalItems: row.totalItems,
        donationDate: row.donationDate,
        donor: row.donor,
        items: [],
      };
    }
    if (row.itemID) {
      donations[row.itemDonationID].items.push({
        itemID: row.itemID,
        ItemName: row.itemName,
        Quantity: row.quantity,
        Category: row.category,
        Quality: row.quality,
      });
    }
  }
  return Object.values(donations);
};

const createItemDonation = async (donorId, items) => {
  const pool = await getPool();
  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

    // 1. Create the donation and get its new ID back
    const donationResult = await new sql.Request(transaction)
      .input("totalItems", sql.Int, totalItems)
      .input("donor", sql.Int, donorId)
      .query(`INSERT INTO itemDonations (totalItems, donationDate, donor)
              OUTPUT INSERTED.itemDonationID
              VALUES (@totalItems, GETDATE(), @donor)`);
    const donationId = donationResult.recordset[0].itemDonationID;

    // 2. For each item: insert it, then link it to the donation
    for (const it of items) {
      const itemResult = await new sql.Request(transaction) // new Request each time
        .input("itemName", sql.NVarChar(100), it.itemName)
        .input("quantity", sql.Int, it.quantity)
        .input("category", sql.NVarChar(50), it.category)
        .input("quality", sql.NVarChar(50), it.quality)
        .query(`INSERT INTO items (itemName, quantity, category, quality)
                OUTPUT INSERTED.itemID
                VALUES (@itemName, @quantity, @category, @quality)`);
      const itemId = itemResult.recordset[0].itemID;

      await new sql.Request(transaction)
        .input("donationId", sql.Int, donationId)
        .input("itemId", sql.Int, itemId)
        .query(`INSERT INTO itemDonationLinks (donationID, itemID)
                VALUES (@donationId, @itemId)`);
    }

    await transaction.commit(); // everything succeeded: save it all
    return { itemDonationID: donationId, totalItems };
  } catch (err) {
    await transaction.rollback(); // something failed: undo everything
    throw err;
  }
};

const createMonetaryDonation = async ({ donorId, amount }) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("amount", sql.Int, amount)
    .input("donor", sql.Int, donorId)
    .query(`INSERT INTO monetaryDonations (amount, donationDate, donor)
              OUTPUT INSERTED.monetaryDonationID
              VALUES (@amount, GETDATE(), @donor)`);
  const donationId = donationResult.recordset[0].monetaryDonationID;
  return result.recordset[0];
};

module.exports = {
  getAllItem,
  getAllMonetary,
  getAllItemWithItems,
  createItemDonation,
  createMonetaryDonation,
};
