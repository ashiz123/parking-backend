const { body } = require('express-validator');


const validateVehicleEntryRequest = [
   

    body('vehicle_reg').notEmpty().withMessage('Vehicle registeration is required'),
    body('vehicle_type').notEmpty().withMessage('vehicle type is required'),
    
    body('vehicle_year')
    .isInt().withMessage('Vehicle of year should be an integer')
    .notEmpty().withMessage('vehicle of year is required'),

    body('vehicle_make').notEmpty().withMessage('vehicle make is required'),

    body('entry_time')
    .notEmpty().withMessage('Vehicle entry time is required')
    .isISO8601().withMessage('timestamp must be is ISO 8601 format'),

    body('lot_id').notEmpty().withMessage('Vehicle lot is required')
    

   
]


module.exports = validateVehicleEntryRequest