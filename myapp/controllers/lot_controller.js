
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

    async getParkingLotsById(req, res)
    {
        const {user_id} = req.params;
        try{
            const parkingLots = await parkingLotService.getParkingLots(user_id);
            res.json(parkingLots);
        }
        catch(error){
            handleError(res, error)
        }
        
    }


    async getParkingLotByLotId(req, res){
        const {lot_id} = req.params;
        try{
            const parkingLot = await parkingLotService.getParkingLotByLotId(lot_id);
            res.json(parkingLot);
        }
        catch(error){
            handleError(res, error);
        }
    }



    async updateParkingLot(req, res)
    {
        console.log('update parking lot');

    }

 
}

const lotController = new LotController();


module.exports = lotController;