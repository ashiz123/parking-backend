const checkTableExists = require("../utils/checkTableExists");



const createParkingLotTable = async(client) => {

 const tableName = 'parking_lots'

    try{
        const result = await checkTableExists(tableName, client);
        if(!result.success ){
        await client.query(
            `CREATE TABLE IF NOT EXISTS parking_lots (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                name VARCHAR(255) NOT NULL,
                postcode VARCHAR(255) NULL,
                state VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                latitude DECIMAL(9, 6),
                longitude DECIMAL(9, 6),    
                total_spots INT UNSIGNED,
                occupied_spaces INT DEFAULT 0 NOT NULL,
                reserved_spaces INT DEFAULT 0 NOT NULL,
                security_features VARCHAR(255),
                surface_type  ENUM('Grass', 'Concrete', 'Asphalt', 'Gravel', 'Dirt'),
                max_height INT,
                grouped BOOLEAN DEFAULT 0 NOT NULL,       
                vehicle_allow_type VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 

                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
                );`
            )
        console.log('parking lot table successfully created');
        return { success: true, message: "Parking Lot table created successfully!" };
        }
    }

    catch(error){
        console.error('Error creating parking lots', error);
        throw error;
    }
}





module.exports = createParkingLotTable;

