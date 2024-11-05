const pool = require('../config/database_connection');

class VehicleModel {
    
    constructor(pool){
        this.pool = pool;
    }

    

    async addVehicleToPark({parking_spot_id, vehicle_reg, vehicle_type, vehicle_year, vehicle_make, entry_time, exit_time}){

        const parkingVehicleQuery = `INSERT INTO parking_vehicle(
            parking_spot_id,
            vehicle_reg,
            vehicle_type,
            vehicle_year,
            vehicle_make,
            entry_time,
            exit_time
            ) VALUES (?, ?, ?, ?, ?, ? , ?)` ;


        try{
           
            // validation
            //validate table is exist
            //sql to add vehicle to parking vehicle table
         const [results] = await this.pool.query(parkingVehicleQuery, [parking_spot_id, vehicle_reg, vehicle_type, vehicle_year, vehicle_make, entry_time, exit_time])
         console.log(results);
         return results.insertId;    

            
        }
        catch(error){
            console.log('Error inserting the vehicle', error);
            throw new Error('database insertion error');
        }
    }
 


}


const vehicleModel = new VehicleModel(pool);


module.exports  = vehicleModel