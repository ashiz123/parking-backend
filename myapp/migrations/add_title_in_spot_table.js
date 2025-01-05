const addTitleInSpotTable = async(pool) => {
    try{
        const queryToPass = `ALTER TABLE parking_spots ADD title VARCHAR(50)  NOT NULL DEFAULT  '';`;
        await pool.query(queryToPass);

        return {
            status: 200,
            message : 'Title added in parking spot table successfully'
        }
    }

    catch(err){
        console.log(err);
        throw err;
    }
}


module.exports = addTitleInSpotTable;