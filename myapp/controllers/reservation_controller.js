
const parkingVehicleServices = require('../services/parkingVehicleServices');
const {handleError} = require('../utils/handleError'); 

class ReservationController{


    async entryVehicle(req, res){

        
        try{
            const vehicleId = await parkingVehicleServices.vehicleEntryToParking(req.body)
            res.status(200).json({message : 'Vehicle entered successfully', vehicleId});
        }
        catch(error){
            console.log('error',error );
            res.json(500).json('Error From controller', error);
        }
      }




    async confirmExitVehicle(req,res){
    
        const {registeration} = req.params


        try{
            const reservedVehicle = await parkingVehicleServices.confirmExitVehicle(registeration);
            res.status(200).json(reservedVehicle);
        }

        catch(error){
            console.log(error);
            res.status(500).json({
                message :  "Error found",
                error : error.message
            })
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
            console.log( error)
            res.status(500).json(error);
        }
    }

   
   


}


const reservationController  = new ReservationController();

module.exports =  {
    reservationController
}
