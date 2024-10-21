 
const pool = require('../config/database_connection'); 

 class SpotModel{

    constructor(pool)
    {
        this.pool = pool;
    }


    async addParkingSpot({parking_lot_id, total_spaces, vehicle_type, is_occupied})
    {
        
     try{
        const createSpotQuery = `INSERT INTO parking_spots(
        parking_lot_id,
        total_spaces,
        vehicle_type,
        is_occupied
        ) VALUES (?, ?, ?, ?)` ;

        const results = await this.pool.query(createSpotQuery, [parking_lot_id, total_spaces, vehicle_type, is_occupied]);

        return {
            message : "Parking spot added successfully", 
            id : results[0].insertId
         }
     }
     catch(error){
        console.log('Error occured', error);
     }


    }


 }


const spotModel = new SpotModel(pool)

module.exports = spotModel;