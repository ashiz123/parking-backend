
const parkingVehicleServices = require('../services/parkingVehicleServices');
const {handleError} = require('../utils/handleError'); 

class VehicleController{


    async entryVehicle(req, res){
        try{
            const vehicleId = await parkingVehicleServices.vehicleEntryToParking(req.body)
            res.status(200).json({message : 'Vehicle entered successfully', vehicleId})
        }
        catch(error){
            handleError(res, error);
        }
      

    }

    async exitVehicle(req, res){

        const {registration_number,parking_spot_id, exit_time, } = req.body;
        const taken_exit_time = exit_time || new Date();

        try{
           
            
            const updated = await parkingVehicleServices.vehicleExitFromParking(registration_number, parking_spot_id, taken_exit_time);
            if(updated){
                res.status(200).json("Vehicle exit successfully");
            }
           
            
        }
        catch(error)
        {
            console.log(error)
            res.status(500).json(error);
        }
    }


}


const vehicleController  = new VehicleController();

module.exports =  {
    vehicleController
}
