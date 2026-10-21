const router = require("express").Router();
const {
  getWishlist,
  updateItem,
  deleteItem,
  createWishlistItem,
  CompleteEntry,
} = require("../controllers/wishlistController");
const { protect, restrictTo } = require("../middleware/auth");

router.use(protect);

router.get("/items", getWishlist);
router.put("/:id", restrictTo("a"), updateItem);
router.put("/complete/:id", CompleteEntry);
router.post("/addItem", restrictTo("a"), createWishlistItem);
router.delete("/:id", restrictTo("a"), deleteItem);

module.exports = router;
