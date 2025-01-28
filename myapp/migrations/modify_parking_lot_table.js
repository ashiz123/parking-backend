

const modifyParkingLotTable  = async(pool) => {
    try{
        await pool.query(`
            ALTER TABLE parking_lots
            ADD login_status INT default 0 NOT NULL AFTER vehicle_allow_type, 
            ADD login_pin INT AFTER login_status;
            `)

        console.log("Parking lot table modified successfully");

        return {
            status : 200,
            message : 'Table modified successfully'
        }

    }
    catch(error)
    {
        console.log('Error while modifying the parking lot table');
        throw error;
    }
}


module.exports = modifyParkingLotTable;