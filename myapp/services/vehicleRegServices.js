
const axios = require('axios');
const {vehicleRegValidation} = require('../validations/vehicleRegValidation');

const DVLA_API_URL = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';
const DVLA_API_HEADERS = {
            'Content-Type' : 'application/json',
            'x-api-key' : process.env.DVLA_API_KEY
        }


        
validateRegisterationNumber = async(registrationNumber) => {
  try{
    const validation = await vehicleRegValidation(registrationNumber);
    if (!validation.valid) {
       throw new Error("Invalid registeration number");
   }
  }
  catch(error){
    throw error;
  }
}


fetchVehicleData = async(body) => 
    {
        try{
            const response = await axios.post(DVLA_API_URL, body, {headers : DVLA_API_HEADERS});
            return response.data;
        }
        catch(error){
            throw new Error('Error fetching DVLA API' + error.message);
        }
       
    }


module.exports = {
    validateRegisterationNumber, fetchVehicleData
}
