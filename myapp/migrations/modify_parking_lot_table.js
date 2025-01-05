

const modifyParkingLotTable  = async(pool) => {
    try{
        await pool.query(`
            ALTER TABLE parking_lots
            ADD occupied_space INT default 0 NOT NULL AFTER total_spots, 
            ADD reserved_space INT default 0 NOT NULL AFTER total_spots;
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