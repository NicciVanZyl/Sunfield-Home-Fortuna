const Wishlist = require("../models/wishlistModel");

exports.getWishlist = async (req, res, next) => {
  try {
    res.json(await Wishlist.getAll());
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    if (req.user.role !== "a") {
      return res
        .status(403)
        .json({ error: "Access Denied: Only admins can access this feature" });
    }
    const entryID = Number(req.params.id);
    const { itemName, quantity, category } = req.body;
    if (!itemName || !quantity || !category)
      return res
        .status(400)
        .json({ error: "Item name, quantity and category are required" });

    const updated = await Wishlist.update({
      entryID,
      itemName,
      quantity,
      category,
    });
    if (!updated) return res.status(404).json({ error: "Item Not Found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
exports.CompleteEntry = async (req, res, next) => {
  try {
    const entryID = Number(req.params.id);
    const updated = await Wishlist.CompleteItem({
      entryID,
    });
    if (!updated) return res.status(404).json({ error: "Item Not Found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const entryID = Number(req.params.id);
    if (!Number.isInteger(entryID)) {
      return res.status(400).json({ error: "Invalid item id" });
    }
    const deleted = await Wishlist.remove({ entryID });
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.createWishlistItem = async (req, res, next) => {
  try {
    const { itemName, quantity, category } = req.body;
    if (!itemName || !quantity || !category) {
      return res
        .status(400)
        .json({ error: "Item name, quantity and category are required" });
    }

    const item = await Wishlist.create({ itemName, quantity, category });
    res.json(item);
  } catch (err) {
    next(err);
  }
};
