const router = require('express').Router();
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/auth');

router.use(protect); // every route below requires a valid JWT

router.get('/', restrictTo('admin'), getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', restrictTo('admin'), deleteUser);

module.exports = router;
