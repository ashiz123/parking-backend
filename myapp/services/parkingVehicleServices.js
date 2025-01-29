const vehicleModel = require('../models/vehicle');
const LotModel = require('../models/lot');


class ParkingVehicleServices {

    async vehicleEntryToParking(data){
        try{
            const reservation = await vehicleModel.addVehicleToPark(data)
            if(!reservation){
                console.log('error here');
                throw new Error('Failed to add vehicle to park')
            }
            if(reservation.sectionId){
                await LotModel.increaseOccupiedOnParkingLot(reservation.lotId);
                await LotModel.increaseOccupiedOnParkingSection(reservation.sectionId)
            }else{
                await LotModel.increaseOccupiedOnParkingLot(reservation.lotId);
            }
           
            return 
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }


    async vehicleExitFromParking(registration_number, exit_time, ){
       
        try {
            const updated = await vehicleModel.removeVehicleFromPark(registration_number,  exit_time, );
            if(!updated){
                console.log('Error while vehicle exit in service');
                throw new Error('Failed to exit vehicle from park');
            }
            return updated;
        }

        catch(error){
            console.log('service error', error);
            throw error;
        }
    }

    async confirmExitVehicle(reg_num){
        try{
            const vehicleDetail = await vehicleModel.confirmExitingVehicle(reg_num);
            if(!vehicleDetail){
                console.log('Vehicle detail to confirm for exit does not found');
                throw new Error('Vehicle to confirm for exit is not in database');
            }
            return vehicleDetail;
        }
        catch(error){
            console.log('Error in parking vehicle service', error);
            throw error;
        }
    }

    async checkVehicleStatus(reg_num){
        try {
            const parkedVehicle = await vehicleModel.checkVehicleExist(reg_num);
            console.log(parkedVehicle);
            return parkedVehicle;
        }

        catch(error){
            console.log('model error', error);
            throw error;
        }
    }


}




const parkingVehicleServices  = new ParkingVehicleServices();


module.exports = parkingVehicleServices;


