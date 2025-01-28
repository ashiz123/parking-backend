const pool = require('../config/database_connection');

class VehicleModel {
    
    constructor(pool){
        this.pool = pool;
    }

    

    async addVehicleToPark({section_id, lot_id, vehicle_reg, vehicle_make, vehicle_type, vehicle_year, entry_time }){

        // console.log('vehicle detail', vehicleDetail);
        // console.log('section', section.id);

       const parkingEntryVehicleQuery = `INSERT INTO reservation(
            lot_id,
            section_id,
            vehicle_reg,
            vehicle_type,
            vehicle_year,
            vehicle_make,
            entry_time) VALUES (?, ?, ?, ?, ?, ?, ? )` ;


        try{
         
         const [results] = await this.pool.query(parkingEntryVehicleQuery, [lot_id, section_id, vehicle_reg, vehicle_type, vehicle_year, vehicle_make, entry_time])
         console.log(results);
         return {
            insertId : results.insertId,
            lotId : lot_id,
            sectionId : section_id
         };    

            
        }
        catch(error){
            console.log('Error inserting the vehicle', error);
            throw new Error('database insertion error');
        }
    }

    async removeVehicleFromPark(registrationNumber, spot_id, exit_time){

        
        const parkingExitVehicleQuery = `UPDATE reservation SET 
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


    async confirmExitingVehicle(reg_num){
        
        const queryToGetVehicleDetail = `SELECT * FROM reservation WHERE vehicle_reg = ?`;
        
        try{
            const [results] = await this.pool.query(queryToGetVehicleDetail, [reg_num]);
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
        const queryToCheckExist = `SELECT * FROM reservation WHERE vehicle_reg = ? AND exit_time IS NULL ORDER BY updated_at DESC
            LIMIT 1`;
        try{
            const [results] = await this.pool.query(queryToCheckExist, [reg_num]);
            if(results.length > 0){
                return results;
            }


        }

    catch(error){
            console.log(error);
            throw error;
        }
    }
 


}





const vehicleModel = new VehicleModel(pool);


module.exports  = vehicleModel