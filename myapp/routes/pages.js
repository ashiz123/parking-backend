
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const lot_controller = require('../controllers/lot_controller');
const spot_controller = require('../controllers/spot_controller');
const {createLotValidation}  = require('../validations/lotValidation');
const {createSpotValidation} = require('../validations/spotValidation');
const {validationError} = require('../middlewares/validationError');



// This is route page   

//create parking lot
router.post('/parking_lot/create', ensureAuthenticated,  upload.none(), createLotValidation, validationError,  lot_controller.createParkingLot);
router.post('/parking_spot/create', ensureAuthenticated,  upload.none(), createSpotValidation, validationError,  spot_controller.addSpace);


module.exports = router;

