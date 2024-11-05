
const parkingVehicleServices = require('../services/parkingVehicleServices');
const {handleError} = require('../utils/handleError'); 

class VehicleController{


    async addVehicle(req, res){
        try{
            const vehicleId = await parkingVehicleServices.vehicleEntryToParking(req.body)
            res.status(200).json({message : 'Vehicle added successfully', vehicleId})
        }
        catch(error){
            handleError(res, error);
        }
      

    }

    removeVehicle(){
        console.log('remove vehicle');
    }


}


const vehicleController  = new VehicleController();

module.exports =  {
    vehicleController
}
