const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
router.get('/users', getAllUsers)
   //  .post((req, res) => {
   //      res.render('users')
   //  })
   // .put((req, res) => {
   //      res.render('users')
   //  })
   //
   //  .delete((req, res) => {
   //      res.render('users')
   //  })
module.exports = router;

