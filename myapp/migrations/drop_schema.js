const pool  = require('../config/database_connection');

const dropTables = async() => {
    const dropUsersTable = `DROP TABLE IF EXISTS users;`;
    const dropParkingLotsTable = `DROP TABLE IF EXISTS parking_lots`;
    const dropParkingSpotsTable = `DROP TABLE IF EXISTS parking_spots`;
    const dropReservationTable = `DROP TABLE IF EXISTS reservation;`;
    const dropPaymentTable = `DROP TABLE IF EXISTS parking_payments;`;
    const dropPricingTable = `DROP TABLE IF EXISTS parking_pricing;`;
    const dropParkingSectionsTable = `DROP TABLE IF EXISTS parking_sections`;

    try {
        await pool.query(dropPricingTable);
        await pool.query(dropPaymentTable);
        await pool.query(dropReservationTable);
        await pool.query(dropParkingSpotsTable);
        await pool.query(dropParkingSectionsTable);
        await pool.query(dropParkingLotsTable);
        await pool.query(dropUsersTable);

        console.log('All table dropped successfully');
    }
    catch(error){
        console.log('Error in dropping table', error)
        throw error;
    }

}

module.exports = dropTables;