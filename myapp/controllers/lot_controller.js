
const parkingLotService = require('../services/parkingLotServices');
const { handleError } = require('../utils/handleError');


class LotController {
     async createParkingLot(req, res) {
        try{
           const lotId = await parkingLotService.addParkingLot(req.body);
           res.status(200).json({ message: 'Lot created successfully', lotId });
        }
        catch(error){
            handleError(res, error)
       }
    }



    updateParkingLot(req, res)
    {
        console.log('update parking lot');

    }
}

// Create an instance of the controller
const lotController = new LotController();

// Export the instance
module.exports = lotController;