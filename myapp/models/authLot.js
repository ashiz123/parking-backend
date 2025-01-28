

const pool = require('../config/database_connection'); // MySQL connection

class AuthLotModel {


    constructor(pool){
        this.pool = pool
    }


    async loginLot(lot_name){
       
        const query = 'SELECT * from parking_lots WHERE name = ?' ;
        const [results] = await this.pool.query(query,[lot_name] );
        return results;

    }
}


const authLotModel = new AuthLotModel(pool);
module.exports = authLotModel;
