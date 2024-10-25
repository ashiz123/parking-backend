


const createParkingLotTable = async(pool) => {

    const [rows] = await pool.query(`
        SELECT COUNT(*) AS count FROM information_schema.tables 
        WHERE table_schema = 'parking_app'
        AND table_name = 'parking_lots' ; `);


        if (rows[0].count > 0) {
            return { success: false, message: "Parking Lot table already exists." };
        }

    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS parking_lots (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                name VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL,
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                total_spots INT UNSIGNED,
                security_features VARCHAR(255),
                surface_type  ENUM('Grass', 'Concrete', 'Asphalt', 'Gravel', 'Dirt'),
                max_height INT,
                grouped BOOLEAN,
                vehicle_allow_type VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically sets the timestamp on creation
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Updates the timestamp on update

                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
                );`
            )
        console.log('parking lot table successfully created');
        return { success: true, message: "Parking Lot table created successfully!" };
    }

    catch(error){
        console.error('Error connecting to database:', error);
        throw error;
    }
}


module.exports = createParkingLotTable;

