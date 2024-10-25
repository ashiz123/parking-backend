
const {body, validationResult} = require('express-validator');


const createSpotValidation =[

    body('parking_lot_id').isInt().withMessage('Parking lot id must be integer'),
    body('parking_lot_id').notEmpty().withMessage('Parking lot id is required'),
    body('total_spaces').isInt().withMessage('Total spaces must be numbers '),
    body('vehicle_type').notEmpty().withMessage('Vehicle type is required'),
    body('is_occupied').notEmpty().withMessage('Occupied must be boolean')

]




module.exports = {
    createSpotValidation
}