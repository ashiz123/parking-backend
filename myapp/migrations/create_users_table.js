

const createUserTable  = async(pool) => {

    const [rows] = await pool.query(`
        SELECT COUNT(*) AS count 
        FROM information_schema.tables
        WHERE table_schema = 'parking_app'
        AND table_name = 'users' ;
        `)

        if(rows[0].count > 0){
            console.log('users table already exists');
            return{success: true, message: "users table already exist"}
        }
    
    
        try{
            await pool.query(
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
        catch(error){
            console.log('Error while creating table', error);
            throw error;
        }
}


module.exports = createUserTable


