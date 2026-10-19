const router = require("express").Router();
const {
  getItemDonations,
  getMonetaryDonations,
  createMonetaryDonation,
  createItemDonation,
} = require("../controllers/donationController");
const { protect } = require("../middleware/auth");

router.use(protect); // every route below requires a valid JWT

router.get("/items", getItemDonations);
router.get("/monetary", getMonetaryDonations);
router.post("/monetary/:id", createMonetaryDonation);
router.post("/items/:id", createItemDonation);

module.exports = router;
