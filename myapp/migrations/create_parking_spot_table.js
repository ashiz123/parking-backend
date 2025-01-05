const checkTableExists = require("../utils/checkTableExists");



const createParkingSpotTable = async(client) => 
{
      const tableName = 'parking_spots';

        // title column is added but the other code is not set up for now
        try{
            const result = await checkTableExists(tableName, client);
            if(!result.success ){
            await client.query(`
                CREATE TABLE IF NOT EXISTS parking_spots(
                id INT AUTO_INCREMENT PRIMARY KEY,
                parking_lot_id INT,
                title VARCHAR(55) NOT NULL,
                total_spaces INT NOT NULL,
                vehicle_type ENUM('Car', 'Lorry', 'Van', 'Motorcycle', 'ev') NOT NULL,
                is_occupied TINYINT(1) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically sets the timestamp on creation
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Updates the timestamp on update

                FOREIGN KEY (parking_lot_id) REFERENCES parking_lots(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
                );
                
                `)
                   console.log('parking_spots table created successfully');
                    return{
                        success : true,
                        message : "Parking spots table created"
                    }
                }
                

    }
    catch(error){
        console.log('Error to create the parking spots table', error);
        throw new Error(`Error while creating spots table: ${error.message}`);
    }
}


module.exports  = createParkingSpotTable;