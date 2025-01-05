const  checkTableExists  = require('../utils/checkTableExists');



const createPricingTable = async(client) => {

    const tableName = 'parking_pricing';

    try{
        const result = await checkTableExists(tableName, client);
        if(!result.success ){
            await client.query(`
                CREATE TABLE IF NOT EXISTS parking_pricing(
                id INT AUTO_INCREMENT PRIMARY KEY,
                parking_spot_id INT,
                hourly_rate DECIMAL(10, 2),
                daily_rate DECIMAL(10, 2),
                weekly_rate DECIMAL(10, 2),
                monthly_rate DECIMAL(10, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically sets the timestamp on creation
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Updates the timestamp on update
                
                FOREIGN KEY (parking_spot_id) REFERENCES parking_spots(id)
                )
                `)

                console.log('Parking price table created successfully');
                return {
                    success: true,
                    message : 'Parking price table created successfully'

                }
        }
       

    }

    catch(error){
        console.error('Error creating pricing table:', error);
        throw new Error(`Failed to create pricing table: ${error.message}`);
    }


}


module.exports = createPricingTable;