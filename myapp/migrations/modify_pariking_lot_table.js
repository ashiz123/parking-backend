

const modifyParkingLotTable  = async(pool) => {
    try{
        await pool.query(`
            ALTER TABLE parking_lots
            MODIFY vehicle_allow_type VARCHAR(255);
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