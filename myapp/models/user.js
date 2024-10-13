const pool = require('../config/database_connection');

class UserModel {
    constructor(pool)
    {
        this.pool = pool;
    }

    async createUser(first_name, last_name, email, password){

        if (!first_name || !last_name || !email || !password) {
            throw new Error('All fields are required.');
        }
    
        // main query to insert the data
        const sql  = `INSERT INTO users(firstname, lastname, email, password) 
        VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        firstname = VALUES(firstname), 
        lastname = VALUES(lastname), 
        password = VALUES(password); `;


        try{
            // pool query return the array with insertId 
            const [results] = await this.pool.query(sql, [first_name, last_name, email, password]);
            return results.insertId;
        }
        catch(error){
            console.log('Error inserting the record', error);
            throw new Error('database insertion error');
        }
    }

    



}

const userModel = new UserModel(pool);



// const updateUser = ()=> {

// }





// const removeUser = () => {

// }




module.exports = userModel;