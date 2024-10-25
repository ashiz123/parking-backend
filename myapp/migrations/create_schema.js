const pool  = require('../config/database_connection');
const createParkingSpotTable = require('./create_parking_spot_table');
const createParkingLotTable = require('./create_parking_lot_table');
const createUserTable = require('./create_users_table');
const createPricingTable = require('./create_pricing_table');

const createTables = async() => {

    try{
        console.log('Creating user table...');
        await createUserTable(pool);  // Check if this is causing an issue

        console.log('Creating parking lot table...');
        await createParkingLotTable(pool); // Ensure this function is being executed

        console.log('Creating parking spot table...');
        await createParkingSpotTable(pool); // Same here

        console.log('Creating parking pricing table...');
        await createPricingTable();

        console.log('All tables created successfully');
    }
    catch(error){
        console.log('Error while creating table', error);
    }

}




module.exports = createTables