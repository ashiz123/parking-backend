const vehicleModel = require('../models/vehicle');


class ParkingVehicleServices {

    async vehicleEntryToParking(data){
        try{
            const vehicleId = await vehicleModel.addVehicleToPark(data)
            console.log('vehicleId', vehicleId);
            if(!vehicleId){
                console.log('error here');
                throw new Error('Failed to add vehicle to park')
            }
            return vehicleId;
        }
        catch(error){
            throw error;
        }
    }


    async vehicleExitFromParking(){

    }


}


const parkingVehicleServices  = new ParkingVehicleServices();


module.exports = parkingVehicleServices;


