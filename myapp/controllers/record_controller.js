const recordService = require("../services/parkingRecordServices");


class RecordController {

    async getParkingVehicle(req, res){
        const{userId} = req.params;
        
        try{
            const parkingRecords = await recordService.getParkingRecords(userId);
            res.status(200).json(parkingRecords);
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                "message" : error.message,
              })
        }

       
      
    }

}

const recordController = new RecordController()
module.exports = {recordController};