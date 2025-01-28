const pool = require('../config/database_connection'); // MySQL connection
const { body, validationResult } = require('express-validator');
const hashPassword = require('../utils/hashPassword');

class LotModel{

    constructor(pool)
    {
        this.pool = pool
    }

    async addParkingLot({user_id,
        name,
        postcode,
        state,
        city,
        latitude,
        longitude,
        total_spots,
        security_features,
        surface_type,
        max_height,
        grouped,
        vehicle_allow_type,
        login_pin
    })
    {

    
        try{
            const hashedPin = await hashPassword(login_pin);
            console.log(hashedPin);
        //    insert query
            const createLotQuery = `
                INSERT INTO parking_lots (
                    user_id, 
                    name, 
                    postcode,
                    state,
                    city,
                    latitude, 
                    longitude, 
                    total_spots, 
                    security_features, 
                    surface_type, 
                    max_height, 
                    grouped, 
                    vehicle_allow_type, 
                    login_pin
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                
            `;

        const results = await this.pool.query(createLotQuery,  [
            user_id,
            name,
            postcode,
            state,
            city,
            latitude,
            longitude,
            total_spots,
            security_features,
            surface_type,
            max_height,
            grouped,
            vehicle_allow_type,
            hashedPin
        ]);
       
        return {
            message : "Parking lot added successfully",
            id : results[0].insertId
        };

        

        }
        catch(error)
        {
            console.log('error in model', error);
            throw error;
        }
        

        
    }

    async getParkingLotsByUserId(id){
       
        const queryLots = `SELECT * FROM parking_lots WHERE user_id = ?`;
        const [results] = await this.pool.query(queryLots, [id]);
        return results;
    } 


    async increaseOccupiedOnParkingLot(lotId){
        const getLot = `UPDATE parking_lots SET occupied_spaces = occupied_spaces + 1 WHERE id = ?`;
        const [results] = await this.pool.query(getLot, [lotId]);
        return results;
    }

    async increaseOccupiedOnParkingSection(sectionId){
        const getLot = `UPDATE parking_sections SET occupied_spaces = occupied_spaces + 1 WHERE id = ?`;
        const [results] = await this.pool.query(getLot, [sectionId]);
        return results;
    }

    async getParkingLotByLotId(lotId){
        const getLotByLotId = `SELECT * FROM parking_lots WHERE ID = ?`;
        const [results] = await this.pool.query(getLotByLotId, [lotId]);
        return results;
    }



    async activateParkingLot(userId, lotId){
       try{
            const queryToActivateLot = `INSERT INTO user_lot_activate(user_id, lot_id) VALUES (?, ?)`;
            const results = await this.pool.query(queryToActivateLot, [userId, lotId]);    
            console.log(results);
            return {
                message : "Parking lot selected",
                lot : results[0].insertId
            }
        }
        catch(error){
            console.log(error);
            throw new Error( 'Issue while selecting lot for user')
        }

    }

   





}


module.exports = new LotModel(pool);