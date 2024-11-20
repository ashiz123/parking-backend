const pool = require('../config/database_connection');

class VehicleModel {
    
    constructor(pool){
        this.pool = pool;
    }

    

    async addVehicleToPark({spot, vehicleDetail}){

        const parkingEntryVehicleQuery = `INSERT INTO parking_vehicle(
            parking_spot_id,
            vehicle_reg,
            vehicle_type,
            vehicle_year,
            vehicle_make,
            entry_time) VALUES (?, ?, ?, ?, ?, ? )` ;


        try{
         
         const [results] = await this.pool.query(parkingEntryVehicleQuery, [spot.id, vehicleDetail.vehicle_reg, vehicleDetail.vehicle_type, vehicleDetail.vehicle_year, vehicleDetail.vehicle_make, vehicleDetail.entry_time])
         console.log(results);
         return results.insertId;    

            
        }
        catch(error){
            console.log('Error inserting the vehicle', error);
            throw new Error('database insertion error');
        }
    }

    async removeVehicleFromPark(registrationNumber, spot_id, exit_time){

        
        const parkingExitVehicleQuery = `UPDATE parking_vehicle SET 
        exit_time = ?
        WHERE vehicle_reg = ? AND parking_spot_id = ? AND exit_time IS NULL;
        `;

        const params = [exit_time, registrationNumber, spot_id];

        try{
            const [results] = await this.pool.execute(parkingExitVehicleQuery, params);
            

            if(results.affectedRows === 0){
                console.log("No matching vehicle found to update.");
                throw new Error('Failed to update exit_time. It may be already set');
            }
            return results.affectedRows;
        }

        catch(error){
            console.log('Error exiting the parkmod', error.message);
            throw error.message;
        }
    }


    async confirmExitingVehicle(registeration){
        
        const queryToGetVehicleDetail = `SELECT * FROM parking_vehicle WHERE vehicle_reg = ?`;
        
        try{
            const [results] = await this.pool.query(queryToGetVehicleDetail, [registeration]);
            if(results.length > 0){
                return results;
            }
            
        }

        catch(error){
            console.log('Error while query in model', error.message);
            throw error;
        }

    }

    async checkVehicleExist(reg_num){
        const queryToCheckExist = `SELECT 1 FROM parking_vehicle WHERE vehicle_reg = ? AND exit_time IS NULL`;
        try{
            const [results] = await this.pool.query(queryToCheckExist, [reg_num]);
            console.log(results);
            if(results.length > 0){
                return true;
            }

            return false;
        }

        catch(error){
            console.log(error);
            throw error;
        }
    }
 


}





const vehicleModel = new VehicleModel(pool);


module.exports  = vehicleModel