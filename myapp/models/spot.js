 
const pool = require('../config/database_connection'); 

 class SpotModel{

    constructor(pool)
    {
        this.pool = pool;
    }


    async addParkingSpot({parking_lot_id, title,  total_spaces, vehicle_type, is_occupied})
    {
        
     try{
        const createSpotQuery = `INSERT INTO parking_spots(
        parking_lot_id,
        title,                  
        total_spaces,
        vehicle_type,
        is_occupied
        ) VALUES (?, ?,  ?, ?, ?)` ;

        const results = await this.pool.query(createSpotQuery, [parking_lot_id, title,  total_spaces, vehicle_type, is_occupied]);

        return {
            message : "Parking spot added successfully", 
            id : results[0].insertId
         }
     }
     catch(error){
        console.log('Error occured', error);
     }


    }


    async getAllParkingSpots() {
      const queryToGetParkingSpot = `
          SELECT 
              id,
              parking_lot_id, 
              total_spaces, 
              vehicle_type,
              is_occupied 
          FROM parking_spots;
      `;
      
      const [results] = await this.pool.query(queryToGetParkingSpot);
      console.log(results);
      return results;
    }



    async FilteringByLotOrId(filterBy, id){
        console.log(filterBy, id);
        const queryToFilterBy = `SELECT * FROM parking_spots WHERE ${filterBy} = ?`;
        
        try{
            const [results] = await  this.pool.query(queryToFilterBy, [ id] );
            console.log(results);
            return results;
        }
        catch(error){
            console.log('Error retrieving data by id', error);
            throw error.message;
        }


    }


 }




module.exports = new SpotModel(pool);