
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
      
        const userId = req.user.id;
        console.log(userId);
        try{
            const parkingLots = await parkingLotService.getParkingLots(userId);
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


    async geLotByAuthId(req, res){
       
        try{
            const userId = req.user.id;
            const parkingLots = await parkingLotService.getParkingLots(userId);
            res.status(200).json(parkingLots);
        }
        catch(error){
            console.log(error);
            res.status(500).json({'message' : error.message || 'No auth user'});
        }
     
    }

    async setActiveLot(req, res){
       try{
        const userId = req.user.id
        const {lotId} = req.body;
        const activateLot = await parkingLotService.activateLot(userId, lotId)
        res.status(200).json(activateLot);
    }
       catch(error){
        res.status(500).json({'message' : error.message });
       }
    }




 
}

const lotController = new LotController();


module.exports = lotController;