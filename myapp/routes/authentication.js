// routes/auth.js
const express = require('express');
const upload = require('../middlewares/multer');
const authController = require('../controllers/auth_controller');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// Registration Route
router.post('/register', upload.none(), authController.registerUser);

// Login Route
router.post('/login', upload.none(), authController.loginUser);

// //Logout Route
router.post('/logout', authController.logoutUser);

// //Profile Route
router.get('/profile', ensureAuthenticated,   authController.profile);





module.exports = router;