
const  checkTableExists  = require('../utils/checkTableExists');


const createReservationTable = async(client) => {

    const tableName = 'reservation';

    try{
        const result = await checkTableExists(tableName, client);
        if(!result.success){
            await client.query(`
                CREATE TABLE reservation (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                lot_id INT NOT NULL, 
                section_id INT NULL,
                vehicle_reg VARCHAR(55),
                vehicle_type VARCHAR(55),
                vehicle_year  INT, 
                vehicle_make VARCHAR(55),
                entry_time TIMESTAMP NOT NULL,
                exit_time TIMESTAMP NULL,
                status TINYINT(1) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                FOREIGN KEY (section_id) REFERENCES parking_sections(id)
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
        console.log("Error creating reservation table", error.message);
        throw new Error(`Error while creating reservation table: ${error.message}`);
    }
    

}


module.exports = createReservationTable;