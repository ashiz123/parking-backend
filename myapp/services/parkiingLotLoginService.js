const authLotModel = require("../models/authLot");


class ParkingLotLoginService {


    async loginLot(lot_name){
    try{
        const lot = await authLotModel.loginLot(lot_name);
        return lot[0];
    }   
    catch(error){
        console.log(error);
        throw error;
    }
    }
}


module.exports = new ParkingLotLoginService