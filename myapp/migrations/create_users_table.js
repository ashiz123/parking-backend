const checkTableExists = require("../utils/checkTableExists");


const createUserTable  = async(client) => {

  const tableName = 'users';
    
        try{
            const result = await checkTableExists(tableName, client);
            if(!result.success ){
            await client.query(
                `CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    firstname VARCHAR(255) NOT NULL,
                    lastname VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    );`
            );

            console.log('users table created successfully');
            return{
                success : true,
                message : "users table created"
            }
        }
        }
        catch(error){
            console.log('Error while creating user table', error);
            throw new Error(`Error while creating user table: ${error.message}`);
           
        }
}


module.exports = createUserTable


