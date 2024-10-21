const pool  = require('../config/database_connection');

const dropTables = async() => {
    dropUsersTable = `DROP TABLE IF EXISTS users;`;
    dropParkingLotsTable = `DROP TABLE IF EXISTS parking_lots`;
    dropParkingSpotsTable = `DROP TABLE IF EXISTS parking_spots`;

    try{
        await pool.query(dropUsersTable);
        await pool.query(dropParkingSpotsTable);
        await pool.query(dropParkingLotsTable);
    }

    catch(error){
        console.log('Error in dropping table', error)
        throw error;
    }

}

module.exports = dropTables;