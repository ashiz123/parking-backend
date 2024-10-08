const pool  = require('../config/database_connection');

const dropTables = async() => {
    dropUserTables = `DROP TABLE IF EXISTS users;`;

    try{
        await pool.query(dropUserTables)
    }

    catch(error){
        console.log('Error in dropping table', error)
    }

}

module.exports = dropTables;