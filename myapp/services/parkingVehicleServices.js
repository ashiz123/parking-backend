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


    async vehicleExitFromParking(registration_number,parking_spot_id, exit_time, ){
       
        try {
            const updated = await vehicleModel.removeVehicleFromPark(registration_number, parking_spot_id,  exit_time, );
            if(!updated){
                console.log('Error while vehicle exit in service');
                throw new Error('Failed to exit vehicle from park');
            }
            return updated;
            
        }

        catch(error){
            throw error;
        }
    }


}




const parkingVehicleServices  = new ParkingVehicleServices();


module.exports = parkingVehicleServices;


