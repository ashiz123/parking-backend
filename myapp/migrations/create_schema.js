const pool  = require('../config/database_connection');
const createParkingSpotTable = require('./create_parking_spot_table');
const createParkingLotTable = require('./create_parking_lot_table');
const createUserTable = require('./create_users_table');
const createPricingTable = require('./create_pricing_table');
const createReservationTable = require("./create_reservation_table");
const createParkingSectionsTable = require("./create_parking_sections_table");
const dropTables = require('./drop_schema');

const createTables = async () => {

    const connection = await pool.getConnection();
   
            try {

                connection.beginTransaction(); // Start the transaction
                console.log('checking connection', connection.beginTransaction());

                console.log('Creating user table...');
                await createUserTable(connection);

                console.log('Creating parking lot table...');
                await createParkingLotTable(connection);

                console.log('Creating parking spot table...');
                await createParkingSpotTable(connection);

                console.log('Creating parking sections table...');
                await createParkingSectionsTable(connection);

                console.log('Creating parking pricing table...');
                await createPricingTable(connection);

                console.log('Creating reservation table...');
                await createReservationTable(connection);

                await connection.commit(); // Commit the transaction if all operations succeed
                console.log('commited successfully');
                console.log('All tables created successfully!');

                
            } 
            catch (error) {
                console.error('Error encountered, rolling back transaction:', error.message);
                try {
                    await dropTables() // Attempt to roll back
                    console.log('Transaction rolled back successfully.');
                } catch (rollbackError) {
                    console.error('Rollback failed:', rollbackError.message);
                }
                throw new Error('All tables could not be created. Transaction rolled back.');
                }

            finally{
                connection.release();
                console.log('Released successfully');
            }
            };
     




module.exports = createTables