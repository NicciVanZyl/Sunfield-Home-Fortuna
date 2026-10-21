const router = require("express").Router();
const {
  getItemDonations,
  getMonetaryDonations,
  createMonetaryDonation,
  createItemDonation,
  getItemsWithDetails,
  getUserItemDonations,
  getUserMonetaryDonations,
  getUserItemsWithDetails,
} = require("../controllers/donationController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/items", getItemDonations);
router.get("/items/:id", getUserItemDonations);
router.get("/monetary", getMonetaryDonations);
router.get("/monetary/:id", getUserMonetaryDonations);
router.get("/itemDetails", getItemsWithDetails);
router.get("/itemDetails/:id", getUserItemsWithDetails);
router.post("/monetary", createMonetaryDonation);
router.post("/items", createItemDonation);

module.exports = router;
