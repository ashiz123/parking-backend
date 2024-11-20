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

    async getAllSpot(req, res){
        try{
            const allSpots = await parkingSpotService.getAllParkingSpots();
            res.status(200).json({
                message : "All spots",
                data : allSpots
            })
        }
        catch(error){
            res.status(500).json('Cant retrieve all spots', error);
        }
    }

     async getSpotsByLotId(req, res){
        try{
            const {lot_id} = req.params;
            const filterByLotId = 'parking_lot_id'
            const spots = await parkingSpotService.filterByLotOrId(filterByLotId, lot_id);
            res.json(spots);
          
        }
        catch(error){
            console.log('error', error);
            res.json(error);
        }
    }

    async getSpotById(req, res){
        try{
            const {id} = req.params;
            const filterById = 'id';
            const spots = await parkingSpotService.filterByLotOrId(filterById, id);
            res.json(spots);
        }
        catch(error){
            console.log(error);
            res.json(error);
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

