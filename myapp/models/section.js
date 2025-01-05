const pool = require('../config/database_connection'); 


class SectionModel {

    constructor(pool){
        this.pool = pool
    }

    async createSectionModel({parking_lot_id, section_name, total_spots, max_height, vehicle_allow_type, security_features}){
        
        try{
            const queryAddSection = `INSERT INTO parking_sections(
                parking_lot_id, section_name, total_spots, max_height, vehicle_allow_type, security_features )
                VALUES (?, ?, ?, ?, ? , ?)`;
                const results = await this.pool.query(queryAddSection, [parking_lot_id, section_name, total_spots, max_height, vehicle_allow_type, security_features ]);
                return {
                    message : 'Parking section created successfully',
                    id : results[0].insertId
                }
        }
        catch(error){
            console.log('Error in model', error);
            throw error
        }
        
        
    }


    async getSectionsByLotId(lotId){
        try{
            const queryToGetSections = `SELECT * FROM parking_sections WHERE parking_lot_id = ?`;
            const [results] = await this.pool.query(queryToGetSections, [lotId]);
            console.log(results);
            return results;
        }
        catch(error){
            console.error('Database query failed', error);
            throw new Error('Database error');
        }
       

    }

    async getSectionBySectionId(id){
        try{
            const queryToGetSectionById = `SELECT * FROM parking_sections WHERE id = ?`;
            const [results] = await this.pool.query(queryToGetSectionById, [id]);
            return results;
        }
        catch(error){
            console.log('Database query failed',error );
            throw new Error('Database error');
        }
    }
}

const parkingSectionModel = new SectionModel(pool);


module.exports = parkingSectionModel;