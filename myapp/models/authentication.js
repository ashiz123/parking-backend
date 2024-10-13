const bcrypt = require('bcrypt');
const pool = require('../config/database_connection'); // MySQL connection
// const passport = require('../config/passport_config'); //passport configuration


class AuthenticationModel{

    constructor(pool)
    {
        this.pool = pool
    }

  async registerUser(firstname, lastname, email, password){
    try{
        //To check user registered
        const [rows] = await this.pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if(rows.length > 0)
        {
            throw new Error('User is already created with this email')
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
    
        // To register new user
        const [results] = await this.pool.query(
            'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
            [firstname, lastname, email, hashedPassword]
        )
        return results.insertId;
    
       
    }

    catch(error){
        console.log('Error inserting the record', error);
        throw new Error('database insertion error');
    }
   
}


  async loginUser(req, res , next){
   

  }


//   async logoutUser(){

//   }



}


const authenticateModel = new AuthenticationModel(pool);

module.exports = authenticateModel;