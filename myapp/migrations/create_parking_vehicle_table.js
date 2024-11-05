
const  checkTableExists  = require('../utils/checkTableExists');
const pool = require('../config/database_connection');

const createParkingVehicleTable = async() => {

    const tableName = 'parking_vehicle';

    try{
        const result = await checkTableExists(tableName);
        if(!result.success){
            await pool.query(`
                CREATE TABLE IF NOT EXISTS parking_vehicle (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                parking_spot_id INT,
                vehicle_reg VARCHAR(55),
                vehicle_type VARCHAR(55),
                vehicle_year  INT, 
                vehicle_make VARCHAR(55),
                entry_time TIMESTAMP NOT NULL,
                exit_time TIMESTAMP NULL,

                FOREIGN KEY (parking_spot_id) REFERENCES parking_spots(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
                );`)

                console.log('Parking vehicle table created successfully');
                return {
                    success : true,
                    message : "Parking vehicle table created successfully"
                };
        }

    }

    catch(error)
    {
        console.log("Error connecting to database", error);
        throw error;
    }
    

}


module.exports = createParkingVehicleTable;