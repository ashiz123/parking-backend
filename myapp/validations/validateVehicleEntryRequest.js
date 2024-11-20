const { body } = require('express-validator');


const validateVehicleEntryRequest = [
   

    body('vehicleDetail.vehicle_reg').notEmpty().withMessage('Vehicle registeration is required'),
    body('vehicleDetail.vehicle_type').notEmpty().withMessage('vehicle type is required'),
    
    body('vehicleDetail.vehicle_year')
    .isInt().withMessage('Vehicle of year should be an integer')
    .notEmpty().withMessage('vehicle of year is required'),

    body('vehicleDetail.vehicle_make').notEmpty().withMessage('vehicle make is required'),

    body('vehicleDetail.entry_time')
    .notEmpty().withMessage('Vehicle entry time is required')
    .isISO8601().withMessage('timestamp must be is ISO 8601 format'),

    body('spot.id')
    .notEmpty().withMessage('Parking spot is required')

   
]


module.exports = validateVehicleEntryRequest