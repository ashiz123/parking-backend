
const { validationResult } = require('express-validator');
const SpotModel = require('../models/spot'); 

class SpotController{


    async addSpace(req, res)
    {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        try{
          const spotId = await SpotModel.addParkingSpot(req.body);
          if (spotId){
            console.log('Spot created successfully', spotId);
            res.status(200).json({ message : 'Parking spot created successfully'})
          }else{
            throw new Error('Failed to create parking spot');
          }
         
        }
        catch(error){
            console.log('Error occured', error);
            return res.status(500).json({
                message: 'An error occurred while creating the parking spot',
                error: error.message || 'Unknown error'
            });
        }

    }

    async updateSpace(location, filters ){
        // Add space for different types of vehicles
    }

    async getSpaceRecord(spotId){
        // Remove space for different types of vehilces
    }

    async updateSpaceStatus(spotId, spaceNumber)
    {

    }



    

}

const spotController  = new SpotController();


module.exports = spotController;

