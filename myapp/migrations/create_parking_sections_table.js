const checkTableExists = require("../utils/checkTableExists");

const createParkingSectionsTable = async(client) => {
    const tableName = 'parking_sections';

    try{
        const result = await checkTableExists(tableName, client);
        if(!result.success ){
            await client.query(`CREATE TABLE IF NOT EXISTS parking_sections(
                id INT AUTO_INCREMENT PRIMARY KEY,
                parking_lot_id INT NOT NULL,
                section_name VARCHAR(55) NOT NULL,
                total_spots INT UNSIGNED NOT NULL,
                occupied_spaces INT DEFAULT 0 NOT NULL,
                reserved_spaces INT DEFAULT 0 NOT NULL,
                max_height INT,
                security_features VARCHAR(255),
                vehicle_allow_type VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                FOREIGN KEY (parking_lot_id)  REFERENCES parking_lots(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
                )` )
        }

        return{
            success: true,
            message : 'parking_sections table created successfully'
        }

    }

    catch(error){
        console.log('Error with table parking sections creation', error);
        throw new Error(`Error while creating sections table: ${error.message}`);
    }
}

module.exports = createParkingSectionsTable;