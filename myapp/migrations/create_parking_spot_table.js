


const createParkingSpotTable = async(pool) => 
{
    const [rows] = await pool.query(`
        SELECT COUNT(*) AS count 
        FROM information_schema.tables
        WHERE table_schema = 'parking_app'
        AND table_name = 'parking_spots' ;
        `)


        if(rows[0].count > 0){
            console.log('table already exists');
            return{success: true, message: "Parking_spots table already exist"}
        }

        try{
            await pool.query(`
                CREATE TABLE IF NOT EXISTS parking_spots(
                id INT AUTO_INCREMENT PRIMARY KEY,
                parking_lot_id INT,
                total_spaces INT NOT NULL,
                vehicle_type ENUM('Car', 'Lorry', 'Van', 'Motorcycle', 'ev') NOT NULL,
                is_occupied BOOLEAN DEFAULT FALSE,
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
    catch(error){
        console.log('Error to create the table', error);
        throw new Error('Failed to create parking spots table');
    }
}


module.exports  = createParkingSpotTable;