  
const recordModel = require('../models/record');

  class ParkingRecordServices{

    async getParkingRecords(auth_id){
     try{
     
            if(!auth_id){
                throw new Error('Authenticated user not found');
            }
            console.log(auth_id);
            const response = await recordModel.getParkingRecord(auth_id);
            if(response.length === 0){
                throw new Error('No record found');
            }
            console.log(response);
            return response;  
      }
     catch(error){
        console.log(error);
        throw error;
     }
    }

    async getParkingRecordsByLotId(lot_id){
      try{
      
             if(!lot_id){
                 throw new Error('Authenticated lot not found');
             }
             
             const response = await recordModel.getParkingRecordByLotId(lot_id);
             if(response.length === 0){
                 throw new Error('No record found');
             }
             console.log('record by lotId', response);
             return response;  
       }
      catch(error){
         console.log(error);
         throw error;
      }
     }



    


  }

  const recordService = new ParkingRecordServices();
  module.exports = recordService;