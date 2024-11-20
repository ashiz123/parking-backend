
const vehicleModel = require('../models/vehicle');
const pool = require('../config/database_connection');

const checkVehicleStatus = async(req, res, next) => {
   const {vehicleDetail} = req.body;
   
   const vehicleExists = await vehicleModel.confirmExitingVehicle(vehicleDetail.vehicle_reg);
   console.log(vehicleExists);
    try{
        if(!vehicleExists){
            return next();
        } 
       
        res.status(500).json({message : 'Vehicle already parking'});
    } 
    catch(error){
        return res.status(500).json({error: 'Internal server error', details : error.message})
    }


   
}
    
module.exports = checkVehicleStatus;