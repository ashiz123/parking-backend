
const vehicleModel = require('../models/vehicle');

const checkVehicleStatus = async(req, res, next) => {
   const {vehicle_reg} = req.body;

   
   const vehicleExists = await vehicleModel.confirmExitingVehicle(vehicle_reg);
   console.log(vehicleExists);
    try{
        if(!vehicleExists){
            return next();
        } 
        console.log('vehicle already exists');
        res.status(500).json({message : 'Vehicle already parking'});
    } 
    catch(error){
        return res.status(500).json({error: 'Internal server error', details : error.message})
    }


   
}
    
module.exports = checkVehicleStatus;