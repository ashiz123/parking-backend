
const parkingVehicleServices = require('../services/parkingVehicleServices');


class ReservationController{


    async entryVehicle(req, res){

        // res.status(200).json({
        //     datas : req.body
        // });

        try{
            const vehicleId = await parkingVehicleServices.vehicleEntryToParking(req.body)
            res.status(200).json({message : 'Vehicle entered successfully', vehicleId});
        }
        catch(error){
            console.log('congtroller error', error);
            res.status(500).json('Error From controller', error);
        }
      }




    async confirmExitVehicle(req,res){
    
        const {reg_num} = req.params


        try{
            const reservedVehicle = await parkingVehicleServices.confirmExitVehicle(reg_num);
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

        const {vehicle_reg } = req.params;
        const exit_time =  new Date().toISOString().slice(0, 19).replace('T', ' ');


        console.log(vehicle_reg, 'reg');
        
        try{
            const updated = await parkingVehicleServices.vehicleExitFromParking(vehicle_reg, exit_time);
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


    async checkVehicleStatus(req, res){
        const {reg_num} = req.params;

        try{
            const parkingVehicle = await parkingVehicleServices.checkVehicleStatus(reg_num);
            if(!parkingVehicle){
                res.status(200).json({
                    data : 'Vehicle parking not found',
                    vehicle_parking : false
                });
            }else{
                res.status(200).json({
                    message : 'Vehicle parking ',
                    vehicle_parking : true,
                    vehicle: parkingVehicle
                });
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({message : 'Vehicle parking ',error : error.message});
        }

    }


   
   


}


const reservationController  = new ReservationController();

module.exports =  {
    reservationController
}
