
const LotModel = require('../models/lot');


class ParkingLotService{

    constructor(){

    }

    async addParkingLot(data)
    {
        try{
            const lotId = await LotModel.addParkingLot(data);
            if(!lotId){
                throw new Error('Failed to create parking lot');
            }

             return lotId
        }
        catch(error)
        {
            console.log(error);
            throw error;
           
        }
        

    }

    async getParkingLots(id){
        try{
          
            const parkingLots = await LotModel.getParkingLotsByUserId(id);
            console.log(parkingLots);
            return parkingLots;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    
    
    async getParkingLotByLotId(lotId){
        try{
            const parkingLot = await LotModel.getParkingLotByLotId(lotId);
            console.log(parkingLot);
            return parkingLot;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async activateLot(userId, lotId){
        try{
            const parkingLotId = await LotModel.activateParkingLot(userId, lotId);
            return parkingLotId;
        }
        catch(error){
            console.log(error);
            throw error;
        }

    }





}


module.exports = new ParkingLotService(); 