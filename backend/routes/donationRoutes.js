const router = require("express").Router();
const {
  getItemDonations,
  getMonetaryDonations,
  createMonetaryDonation,
  createItemDonation,
  getItemsWithDetails,
} = require("../controllers/donationController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/items", getItemDonations);
router.get("/monetary", getMonetaryDonations);
router.get("/itemDetails", getItemsWithDetails);
router.post("/monetary", createMonetaryDonation);
router.post("/items", createItemDonation);

module.exports = router;