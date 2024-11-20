
const modifyParkingSpotTable =async(pool) => {
    try{
        await pool.query(`
            ALTER TABLE parking_spots 
            MODIFY is_occupied TINYINT(1) DEFAULT 0
            `)

            console.log('Parking spot table, is_occupied modified successfully ');
            return {
                status : 200,
                message : 'table modified successfully'
            }

    }

    catch(error){
        console.log('Error while modifying the parking spot table');
        throw error;
    }
}


module.exports  = modifyParkingSpotTable;