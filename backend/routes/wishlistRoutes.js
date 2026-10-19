const router = require("express").Router();
const {
  getWishlist,
  updateItem,
  deleteItem,
  createWishlistItem,
} = require("../controllers/wishlistController");
const { protect, restrictTo } = require("../middleware/auth");

router.use(protect);
router.use(restrictTo("admin")); // every route below requires a valid JWT

router.get("/items", getWishlist);
router.put("/:id", updateItem);
router.post("/:id", createWishlistItem);
router.delete("/:id", deleteItem);

module.exports = router;
