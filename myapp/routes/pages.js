
const express = require('express');
const axios = require('axios');
const router = express.Router();
const upload = require('../middlewares/multer');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const lot_controller = require('../controllers/lot_controller');
const spot_controller = require('../controllers/spot_controller');
const {createLotValidation}  = require('../validations/lotValidation');
const {createSpotValidation} = require('../validations/spotValidation');
const validateVehicleEntryRequest = require('../validations/validateVehicleEntryRequest');
const validateConfirmExitVehicle = require('../validations/validateConfirmExitVehicle')
const {validationError} = require('../middlewares/validationError');
const { vehicleRegController } = require('../controllers/vehicleReg_controller');
const {reservationController} = require('../controllers/reservation_controller');
const checkVehicleStatus = require('../middlewares/checkVehicleStatus');




// This is route page   

//create parking lot
router.post('/parking_lot/create', ensureAuthenticated,  upload.none(), createLotValidation, validationError,  lot_controller.createParkingLot);
router.post('/parking_spot/create', ensureAuthenticated,  upload.none(), createSpotValidation, validationError,  spot_controller.addSpace);
router.get('/parking_spots', spot_controller.getAllSpot )
router.get('/parking_spots_by_lotId/:lot_id', spot_controller.getSpotsByLotId);
router.get('/parking_spot_by_id/:id', spot_controller.getSpotById);





router.post('/get_vehicle_reg', vehicleRegController.getVehicleDetail);
router.post('/entry_vehicle', checkVehicleStatus, upload.none(), validateVehicleEntryRequest, validationError,  reservationController.entryVehicle);
router.get('/confirm_exit_vehicle/:registeration',  reservationController.confirmExitVehicle);
router.put('/exit_vehicle/:id', reservationController.exitVehicle);





module.exports = router;

