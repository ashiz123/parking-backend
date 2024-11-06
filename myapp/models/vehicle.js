const pool = require('../config/database_connection');

class VehicleModel {
    
    constructor(pool){
        this.pool = pool;
    }

    

    async addVehicleToPark({parking_spot_id, vehicle_reg, vehicle_type, vehicle_year, vehicle_make, entry_time, exit_time}){

        const parkingEntryVehicleQuery = `INSERT INTO parking_vehicle(
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
         const [results] = await this.pool.query(parkingEntryVehicleQuery, [parking_spot_id, vehicle_reg, vehicle_type, vehicle_year, vehicle_make, entry_time, exit_time])
         console.log(results);
         return results.insertId;    

            
        }
        catch(error){
            console.log('Error inserting the vehicle', error);
            throw new Error('database insertion error');
        }
    }

    async removeVehicleFromPark(registrationNumber, spot_id, exit_time){

        console.log("model", registrationNumber, spot_id, exit_time);
        const parkingExitVehicleQuery = `UPDATE parking_vehicle SET 
        exit_time = ?
        WHERE vehicle_reg = ? AND parking_spot_id = ?;
        `;

        const params = [exit_time, registrationNumber, spot_id];

        try{
            const [results] = await this.pool.execute(parkingExitVehicleQuery, params);
            console.log(results);

            if(results.affectedRows === 0){
                console.log("No matching vehicle found to update.");
                return null;
            }
            return results.affectedRows;
        }

        catch(error){
            console.log('Error exiting the park', error);
            throw new Error('Model error , database insertion error');
        }
    }
 


}


const vehicleModel = new VehicleModel(pool);


module.exports  = vehicleModel