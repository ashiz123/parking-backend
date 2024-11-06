
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
const {validationError} = require('../middlewares/validationError');
const { vehicleRegController } = require('../controllers/vehicleReg_controller');
const {vehicleController} = require('../controllers/vehicle_controller');




// This is route page   

//create parking lot
router.post('/parking_lot/create', ensureAuthenticated,  upload.none(), createLotValidation, validationError,  lot_controller.createParkingLot);
router.post('/parking_spot/create', ensureAuthenticated,  upload.none(), createSpotValidation, validationError,  spot_controller.addSpace);

router.post('/get_vehicle_reg', vehicleRegController.getVehicleDetail);
router.post('/entry_vehicle', upload.none(), validateVehicleEntryRequest,validationError,  vehicleController.entryVehicle);
router.put('/exit_vehicle', vehicleController.exitVehicle);




//get vehicle reg no
// router.post('/get_vehicle_reg', async(req, res) => {
   
//   const{registrationNumber} = req.body
//   const validation = vehicleRegValidation(registrationNumber);
//     if (!validation.valid) {
//         return res.status(400).json({ error: validation.error });
//     }


//     try{
//         const {body} = req
//         const response = await axios.post('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', body, {
//             headers : {
//                 'Content-Type' : 'application/json',
//                 'x-api-key'  : process.env.DVLA_API_KEY, 
                
//             }
//         });
//        res.json(response.data)
//     }
//     catch(error){
//         console.error('Error fetching data from DVLA API:', error); // Log error for debugging
//         res.status(500).send('Error fetching data from DVLA API', error);
//     }
   
// })

module.exports = router;

