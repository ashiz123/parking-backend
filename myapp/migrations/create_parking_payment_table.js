const  checkTableExists  = require('../utils/checkTableExists');
const pool = require('../config/database_connection');

const createParkingPaymentTable = async() => {

    const tableName = 'parking_payments';

    try{
        const result = await checkTableExists(tableName);
        if(!result.success){
            await pool.query(`
                CREATE TABLE IF NOT EXISTS parking_payments(
                id INT AUTO_INCREMENT PRIMARY KEY,
                parking_spot_id INT,
                session_id INT,
                user_id INT,
                amount DECIMAL(10,2),
                payment_method VARCHAR(255),
                payment_date DATETIME,
                status ENUM('successful', 'failed', 'pending'),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                FOREIGN KEY (session_id) REFERENCES parking_vehicle(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
                );`
            );

            console.log('Parking payments table created successfully');
            return{
                success : true,
                message : "Parking payments table created successfully"
            }
        }

       return result;

        
    }

    catch(error){
        console.log('Error creating parking payments table', error);
        throw error;
    }

}



module.exports = createParkingPaymentTable;