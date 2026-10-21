const Donations = require("../models/donationModel");

exports.getItemDonations = async (req, res, next) => {
  try {
    res.json(await Donations.getAllItem());
  } catch (err) {
    next(err);
  }
};

exports.getMonetaryDonations = async (req, res, next) => {
  try {
    res.json(await Donations.getAllMonetary());
  } catch (err) {
    next(err);
  }
};

exports.getUserMonetaryDonations = async (req, res, next) => {
  try {
    res.json(await Donations.getUserMonetary(req.user.id));
  } catch (err) {
    next(err);
  }
};

exports.getUserItemDonations = async (req, res, next) => {
  try {
    res.json(await Donations.getUserItems(req.user.id));
  } catch (err) {
    next(err);
  }
};

exports.getUserItemsWithDetails = async (req, res, next) => {
  try {
    res.json(await Donations.getUserItemWithItems(req.user.id));
  } catch (err) {
    next(err);
  }
};

exports.getItemsWithDetails = async (req, res, next) => {
  try {
    res.json(await Donations.getAllItemWithItems());
  } catch (err) {
    next(err);
  }
};

exports.createMonetaryDonation = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "amount is required" });
    }

    const donation = await Donations.createMonetaryDonation({
      donorId: req.user.id,
      amount,
    });
    res.status(201).json(donation);
  } catch (err) {
    next(err);
  }
};

exports.createItemDonation = async (req, res, next) => {
  try {
    const { items, dropoffDate, dropoffTime } = req.body;
    console.log(items);
    
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "At least one item is required" });
    }
    for (const it of items) {
      if (!it.itemName || !Number.isInteger(it.quantity) || it.quantity < 1) {
        return res.status(400).json({
          error: "Each item needs a name and a quantity of 1 or more",
        });
      }
    }

    const mapped = items.map((it) => ({
      itemName: it.itemName,
      quantity: it.quantity,
      category: it.category,
      quality: it.quality,
    }));

    const donation = await Donations.createItemDonation(req.user.id, mapped,dropoffDate,dropoffTime);
    res.status(201).json(donation);
  } catch (err) {
    next(err);
  }
};
