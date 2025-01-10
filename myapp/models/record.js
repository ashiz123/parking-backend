const pool = require('../config/database_connection'); 


class ParkingRecordModel{

    constructor(pool){
        this.pool = pool;
    }

    async getParkingRecord(auth_id){
       try{
      
        const queryParkingRecord = `
SELECT 
    r.id AS reservation_id, 
    r.lot_id, 
    r.section_id, 
    r.vehicle_reg, 
    r.vehicle_type, 
    r.vehicle_year, 
    r.vehicle_make, 
    r.entry_time, 
    r.exit_time, 
    r.status, 
    r.created_at, 
    r.updated_at, 
    l.name AS lot_name, 
    s.section_name 
FROM 
    reservation r 
INNER JOIN 
    parking_lots l ON r.lot_id = l.id 
LEFT JOIN 
    parking_sections s ON r.section_id = s.id 
INNER JOIN 
    users u ON l.user_id = u.id 
WHERE 
    u.id = ?`;
        const [results] = await this.pool.query(queryParkingRecord, [auth_id]);
        console.log('results', results);
        return results;
       }
       catch(error){
         console.log(error);
         throw error;
       }
    }   

}

const recordModel = new ParkingRecordModel(pool);
module.exports = recordModel;