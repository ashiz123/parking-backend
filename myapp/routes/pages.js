const router = express.Router();
const express = require('express');
const upload = require('../middlewares/multer');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');


// This is route page 