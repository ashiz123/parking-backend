const pool = require('../config/database_connection'); // MySQL connection
const { body, validationResult } = require('express-validator');

class LotModel{

    constructor(pool)
    {
        this.pool = pool
    }

    async addParkingLot({user_id,
        name,
        location,
        latitude,
        longitude,
        total_spots,
        security_features,
        surface_type,
        max_height,
        grouped,
        vehicle_allow_type})
    {
    
        try{
        //    insert query
            const createLotQuery = `
                INSERT INTO parking_lots (
                    user_id, 
                    name, 
                    location, 
                    latitude, 
                    longitude, 
                    total_spots, 
                    security_features, 
                    surface_type, 
                    max_height, 
                    grouped, 
                    vehicle_allow_type
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                
            `;

        const results = await this.pool.query(createLotQuery,  [
            user_id,
            name,
            location,
            latitude,
            longitude,
            total_spots,
            security_features,
            surface_type,
            max_height,
            grouped,
            vehicle_allow_type
        ]);
       
        return {
            message : "Parking lot added successfully",
            id : results[0].insertId
        };

        

        }
        catch(error)
        {
            console.log(error);
            throw new Error('Error occurred while creating parking lot');
        }
        

        
    }





}


module.exports = new LotModel(pool);