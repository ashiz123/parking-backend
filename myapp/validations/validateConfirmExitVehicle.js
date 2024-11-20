const {body} = require('express-validator');

const validateConfirmExitVehicle = [
    body('registeration_number').notEmpty().withMessage('Vehicle registertion number is required')
]

module.exports = validateConfirmExitVehicle
