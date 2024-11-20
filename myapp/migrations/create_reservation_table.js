
const  checkTableExists  = require('../utils/checkTableExists');
const pool = require('../config/database_connection');

const createReservationTable = async() => {

    const tableName = 'reservation';

    try{
        const result = await checkTableExists(tableName);
        if(!result.success){
            await pool.query(`
                CREATE TABLE reservation (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                parking_spot_id INT NULL,
                vehicle_reg VARCHAR(55),
                vehicle_type VARCHAR(55),
                vehicle_year  INT, 
                vehicle_make VARCHAR(55),
                entry_time TIMESTAMP NOT NULL,
                exit_time TIMESTAMP NULL,
                status TINYINT(1) DEFAULT 0, 

                FOREIGN KEY (parking_spot_id) REFERENCES parking_spots(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
                );`)

                console.log('Reservation table created successfully');

                return {
                    success : true,
                    message : "Reservation table created successfully"
                };
        }


       throw new Error('Reservation table already exists');
    }

    catch(error)
    {
        console.log("Error connecting to database", error.message);
        throw error;
    }
    

}


module.exports = createReservationTable;