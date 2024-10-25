const parkingSpotService = require('../services/parkingSpotServices');
const {handleError} = require('../utils/handleError'); 

class SpotController{


    async addSpace(req, res)
    {
        try{
           const spotId = await parkingSpotService.addParkingSpot(req.body);
           res.status(200).json({message : 'Parking spot created successsfully', spotId})
         
        }
        catch(error){
            handleError(res, error)
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

