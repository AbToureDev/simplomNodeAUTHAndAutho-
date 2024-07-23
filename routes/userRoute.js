const express = require('express');
const router = express.Router();
const {getAllUsers,getUserById, updateUser, deleteUser} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
router.get('/users', verifyToken, getAllUsers)
router.get('/:id', getUserById)
router.get('/:id', updateUser)
router.get('/:id', deleteUser)
module.exports = router;

