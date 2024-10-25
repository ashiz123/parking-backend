
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
            throw error;
        }
        

    }





}


module.exports = new ParkingLotService(); 