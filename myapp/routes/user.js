
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const {register, login} = require('../controllers/user_controller')

router.post('/register', upload.none(), register);

router.post('/login',upload.none(), (req, res) => {
    res.send('this is login')
})






module.exports = router