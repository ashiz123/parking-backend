
const express = require('express');
// const axios = require('axios');
const router = express.Router();
const upload = require('../middlewares/multer');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const lotController = require('../controllers/lot_controller');
const sectionContoller = require('../controllers/section_controller');
const spot_controller = require('../controllers/spot_controller');
const payment_controller = require('../controllers/payment_controller');
const {createLotValidation}  = require('../validations/lotValidation');
const {createSpotValidation} = require('../validations/spotValidation');
const validateVehicleEntryRequest = require('../validations/validateVehicleEntryRequest');
// const validateConfirmExitVehicle = require('../validations/validateConfirmExitVehicle')
const {validationError} = require('../middlewares/validationError');
const { vehicleRegController } = require('../controllers/vehicleReg_controller');
const {reservationController} = require('../controllers/reservation_controller');
const {recordController} = require('../controllers/record_controller');
const checkVehicleStatus = require('../middlewares/checkVehicleStatus');
const lot_auth_controller = require('../controllers/lot_auth_controller');
const authenticateLot = require('../middlewares/authenticateLotToken');







//get vehicle detail
router.post('/get_vehicle_reg', vehicleRegController.getVehicleDetail);
//LOT 
router.post('/parking_lots', ensureAuthenticated,  upload.none(), createLotValidation, validationError,  lotController.createParkingLot);
router.get('/parking_lots/:user_id', ensureAuthenticated, lotController.getParkingLotsById);
router.get('/parking_lot/:lot_id', lotController.getParkingLotByLotId);
router.get('/parking_lots_by_auth_user',ensureAuthenticated,  lotController.geLotByAuthId);


//SET PARKING LOT
router.post('/parking_lots/activate_lot',upload.none(), ensureAuthenticated, lotController.setActiveLot);
router.post('/lot/login', upload.none(), lot_auth_controller.loginParkingLot);
router.get('/lot/getAuthLot', authenticateLot, lot_auth_controller.getLot);

//SECTION
router.post('/parking_section', ensureAuthenticated, upload.none(), sectionContoller.createSection);
router.get('/parking_sections_by_lotId/:lotId', upload.none(), sectionContoller.getSectionsByLotId);
router.get('/parking_section_by_id/:id', upload.none(), sectionContoller.getSectionBySectionId);



//SPOT IS NOT USED FOR NOW
router.post('/parking_spot/create', ensureAuthenticated,  upload.none(), createSpotValidation, validationError,  spot_controller.addSpace);
router.get('/parking_spots', spot_controller.getAllSpot )
router.get('/parking_spots_by_lotId/:lot_id', spot_controller.getSpotsByLotId);
router.get('/parking_spot_by_id/:id', spot_controller.getSpotById);


//RESERVATION 
router.get('/check_vehicle_status/:reg_num',  reservationController.checkVehicleStatus);
router.post('/entry_vehicle', checkVehicleStatus, upload.none(), validateVehicleEntryRequest, validationError,  reservationController.entryVehicle);
router.get('/confirm_exit_vehicle/:reg_num',  reservationController.confirmExitVehicle);
router.put('/exit_vehicle/:vehicle_reg', reservationController.exitVehicle);

//PARKING RECORD
router.get('/get_parking_records_byUser/:userId', recordController.getParkingVehicleByUserId); //authenticate by user
router.get('/get_parking_records_byLot/:lotId', recordController.getParkingVehicleByLotId);


//STRIPE 
router.post('/create_payment_intent', upload.none(), payment_controller.createPaymentIntent);


// router.get('/protected', authenticateLot, (req, res) => {
//     res.json({
//         message : req.lot
//     });
// })


module.exports = router;

