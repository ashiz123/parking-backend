// controllers/lot_controller.js
// const lot = require('../models/lot'); // Assuming this is for your database model

const LotModel = require('../models/lot');
const { validationResult } = require('express-validator');


class LotController {
     async createParkingLot(req, res, next) {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }


       try{
        const lotId = await LotModel.addParkingLot(req.body);
        console.log('Lot created successfully', lotId);
        res.status(200).json({message: 'Lot created successfully'})

       }
       catch(error){
        console.error('Error while adding parking lot', error);
        res.status(500).json({ message: error.message });
       }
    }

    updateParkingLot(req, res, next)
    {
        console.log('update parking lot');

    }
}

// Create an instance of the controller
const lotController = new LotController();

// Export the instance
module.exports = lotController;