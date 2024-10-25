// lotValidation.js
const { body } = require('express-validator');

const createLotValidation = [
    body('user_id').isInt().withMessage('user_id must be an integer'),
    body('name').notEmpty().withMessage('Name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('latitude').isFloat({min: -90, max: 90}).withMessage('Latitude must be between -90 and 90'),
    body('longitude').isFloat({min : -180 , max: 180}).withMessage('Longitude must be between -180 and 180'),
    body('total_spots').isInt({min:0}).withMessage('Total spots must have positive value'),
    body('grouped').isBoolean().withMessage('Grouped must be a boolean'),
    body('vehicle_allow_type').notEmpty().withMessage('Vehicle allow type is required')
]


module.exports = {
    createLotValidation
}


// total_spots,
// security_features,
// surface_type,
// max_height,
// grouped,
// vehicle_allow_typ