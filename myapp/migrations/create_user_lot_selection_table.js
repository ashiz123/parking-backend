const checkTableExists = require("../utils/checkTableExists");
const pool  = require('../config/database_connection');



const createUserLotSelectionTable = async() => {

    const tableName = 'user_lot_activate';

    try{
        const result = await checkTableExists(tableName, pool);
        if(!result.success){
            await pool.query(`CREATE TABLE IF NOT EXISTS  user_lot_activate(
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL, 
                lot_id INT NOT NULL,
                UNIQUE (user_id, lot_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
                FOREIGN KEY (lot_id) REFERENCES parking_lots(id) ON DELETE CASCADE
                )`)
        }

        return {
            success : true,
            message : "user lot activate table created successfully"
        }
    }
 
    catch(error){
        console.log(error);
        throw error;
    }


}


module.exports = createUserLotSelectionTable;