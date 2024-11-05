const {validateRegisterationNumber, fetchVehicleData} = require('../services/vehicleRegServices');


class VehicleRegController{


    constructor(){
        // this.getVehicleDetail = this.getVehicleDetail.bind(this); for binding if the function is not instance of class.
    }

    getVehicleDetail = async(req, res) => {
        const{registrationNumber} = req.body
        try{
            validateRegisterationNumber(registrationNumber);
            const vehicleData = await fetchVehicleData(req.body);
            res.json(vehicleData);
        }
        catch(error){
            console.error('DVLA API Error', error.message);
            res.status(400).json({message :'Invalid registeration number'});
        }
    }


}


const vehicleRegController =  new VehicleRegController()
module.exports = {vehicleRegController}