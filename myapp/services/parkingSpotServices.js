const Spot = require('../models/spot');

class ParkingSpotServices {

    async addParkingSpot(data)
    {
        try{
            const spotId = Spot.addParkingSpot(data);
            if(!spotId){
                throw new Error('Failed to create parking spot')
            }

            return spotId;

        }
        catch(error)
        {
            console.log(error);
            throw error
        }
    }

    async getAllParkingSpots(){
       try{
        const allSpots = Spot.getAllParkingSpots();
        return allSpots;
       }

       catch(error){
        console.log(error);
        throw error;
       }
    }

   
    async filterByLotOrId(filteringBy, id){
        try{
            const spots = Spot.FilteringByLotOrId(filteringBy, id);
            if(!spots){
                throw new Error('Spots not found');
            }

            return spots;
        }
        catch(error){
            console.log(error);
            return error;
        }
    }





}

const parkingSpotService = new ParkingSpotServices()

module.exports = parkingSpotService;